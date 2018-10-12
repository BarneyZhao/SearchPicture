const glob = require('glob');
const path = require('path');
const fs = require('fs');
const cpfork = require('child_process').fork;
const numCPUs = require('os').cpus().length;
const { app } = require('electron');
const imageChild = `${app.getAppPath()}/app/childs/imageChecker.js`;
const CACHE_FILE_NAME = 'search_picture_cache.txt';
const ONE_THREAD_MAX = 50;

/**
 * get files by glob
 * @param {String} folderPath
 * @param {String} fileType 'jpg,png[,xxx]'
 * @return {Array(String)} filesPath
 */
const getFiles = (folderPath, fileType) => {
  return new Promise((resolve, reject) => {
    console.log('running glob...');
    glob(`${folderPath}/**/*.{${fileType}}`, { nodir: true }, (err, filesPath) => {
      if (!err) {
        resolve(filesPath);
      } else {
        reject(err);
      }
    });
  });
};

/**
 * check target image size
 * @param {Array(String)} filesPath
 * @return {Array(Object)} totalCheckedImages {n,w,h}
 */
const checkImages = (filesPath) => {
  if (!Array.isArray(filesPath)) {
    return Promise.reject(new Error('checkImages require array input'));
  }
  if (filesPath.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve) => {
    let workerCount = 0;
    let workers = [];
    let totalCheckedImages = [];
    let filesPathQueue = [...filesPath];
    const idealThreads = Math.ceil(filesPath.length / ONE_THREAD_MAX);
    const realThreads = idealThreads > numCPUs ? numCPUs : idealThreads;
    const singleThreadHandleCount = Math.ceil(filesPath.length / realThreads);
    const workOnMessage = ({ id, checkedImages }) => {
      totalCheckedImages.push(...checkedImages);
      workers[id - 1].kill();
      console.log(`child:${id} is close. now total finished:${totalCheckedImages.length}/${filesPath.length}`);
      workerCount += 1;
      if (workerCount === realThreads) {
        console.log('all childs finished.');
        resolve(totalCheckedImages);
      }
    };
    for (let i = 1; i <= realThreads; i += 1) {
      const thisThreadHandleFiles = filesPathQueue.splice(0, singleThreadHandleCount + 1);
      const worker = cpfork(imageChild);
      worker.on('message', workOnMessage);
      worker.send({
        id: i,
        thisThreadHandleFiles,
      });
      workers.push(worker);
    }
  });
};

/**
 * read cache
 * @param {String} folderPath
 * @return {Array(Object)} checkedImages {n,w,h}
 */
const readCache = (folderPath) => {
  return new Promise((resolve, reject) => {
    let checkedImages = [];
    fs.readFile(`${folderPath}/${CACHE_FILE_NAME}`, 'utf8', (err, data) => {
      if (!err) {
        console.log('get data from cache.');
        try {
          checkedImages = JSON.parse(data);
          resolve(checkedImages);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      } else {
        resolve(checkedImages);
      }
    });
  });
};

const writeCache = (folderPath, data) => {
  console.log(`writting ${CACHE_FILE_NAME}.`);
  fs.writeFile(`${folderPath}/${CACHE_FILE_NAME}`, JSON.stringify(data), (writeErr) => {
    if (writeErr) {
      console.log(writeErr);
    } else {
      console.log(`${CACHE_FILE_NAME} is created.`);
    }
  });
};

const copyFiles = (source, target) => {
  return new Promise((resolve) => {
    fs.copyFile(source, target, (err) => {
      if (err) {
        console.log(`copy erorr with: ${source} to ${target}`);
        console.log(err);
      }
      resolve();
    });
  });
};

exports.search = (q) => {
  return Promise.all([
    getFiles(q.searchFolder, 'jpg,png'),
    readCache(q.searchFolder)
  ]).then(([currentFilesPath, checkedImagesFromCache]) => {
    let returnImages = [];
    let needCheckImagesPath = [];
    currentFilesPath.forEach(path => {
      let img = checkedImagesFromCache.find(image => path === image.n);
      if (img) {
        returnImages.push(img);
      } else {
        needCheckImagesPath.push(path);
      }
    });
    return checkImages(needCheckImagesPath).then((checkedImages) => {
      returnImages.push(...checkedImages);
      writeCache(q.searchFolder, returnImages);
      return returnImages.sort();
    });
  }).then((images) => {
    // files filter by conditions
    const filteredImages = [];
    if ((q.w && q.h) || (q.rw && q.rh)) {
      images.forEach((image) => {
        if (
          q.w && q.h &&
          Number.parseInt(q.w, 0) === image.w &&
          Number.parseInt(q.h, 0) === image.h
        ) {
          filteredImages.push(image);
        } else if (
          q.rw && q.rh &&
          (image.w / image.h).toFixed(2) ===
          (Number.parseInt(q.rw, 0) / Number.parseInt(q.rh, 0)).toFixed(2)
        ) {
          filteredImages.push(image);
        }
      });
    } else {
      filteredImages.push('msg');
      filteredImages.push(`conditions error, but ${CACHE_FILE_NAME} has created.`);
    }
    // console.log('finish...');
    return filteredImages;
  });
};

exports.exportToFolder = ({ data, folderPath }) => {
  console.log(`export search result to ${folderPath} and files count : ${data.length}`);
  // const logTimes = 4;
  // const logCount = Math.ceil(data.length / logTimes);
  let copyPromises = [];
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  data.forEach((file, index) => {
    try {
      // 不同文件夹下的重名文件在导出文件夹只会存在一张
      const filename = path.basename(file.n);
      copyPromises.push(copyFiles(file.n, `${folderPath}/${filename}`));
      // if (index + 1 !== data.length) {
      //   for (let i = 1; i <= logTimes; i += 1) {
      //     if (index + 1 === logCount * i) {
      //       console.log(`export: ${index + 1}/${data.length}`);
      //     }
      //   }
      // } else {
      //   console.log(`export: ${index + 1}/${data.length}`);
      // }
    } catch (error) {
      console.log(error);
    }
  });
  return Promise.all(copyPromises);
};

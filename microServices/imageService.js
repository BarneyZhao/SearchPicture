const glob = require('glob');
const fs = require('fs');
const cpfork = require('child_process').fork;
const numCPUs = require('os').cpus().length;
const imageChild = `${__dirname}/childs/imageChecker.js`;
const CACHE_FILE_NAME = 'search_picture_cache.txt';
const ONE_THREAD_MAX = 50;

/**
 * get files by glob
 * @param {String} folderPath
 * @param {String} fileType 'jpg,png[,xxx]'
 * @return {Array(String)} filesPath
 */
const getFiles = (folderPath) => {
  return new Promise((resolve, reject) => {
    console.log('running glob...');
    glob(`${folderPath}/**/*.{jpg,jpeg,png,gif}`, { nodir: true }, (err, filesPath) => {
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

exports.search = (q) => {
  return Promise.all([
    getFiles(q.searchFolder),
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
    let msg;
    let filteredImages = [];
    let testType = 0;
    if (q.conditionType === 'pixel' && (q.w || q.h)) testType = 1;
    if (q.conditionType === 'ratio' && q.rw && q.rh) testType = 2;
    if (testType !== 0) {
      images.forEach((image) => {
        let flag;
        if (testType === 1) {
          let testW = Number.parseInt(q.w, 0) === image.w;
          let testH = Number.parseInt(q.h, 0) === image.h;
          if (
            (q.w && q.h && testW && testH) ||
            (q.w && !q.h && testW) ||
            (!q.w && q.h && testH)
          ) {
            flag = true;
          }
        } else if (testType === 2) {
          if (
            (image.w / image.h).toFixed(2) ===
            (Number.parseInt(q.rw, 0) / Number.parseInt(q.rh, 0)).toFixed(2)
          ) {
            flag = true;
          }
        }
        if (flag) filteredImages.push(image);
      });
    } else {
      // msg = '没有搜索条件最多显示100张';
      // filteredImages.push(...images.slice(0, 100));
      filteredImages = images;
    }
    // console.log('finish...');
    return {
      images: filteredImages,
      msg,
    };
  });
};

exports.getFiles = getFiles;

exports.checkImages = checkImages;

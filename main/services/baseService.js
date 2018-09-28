const glob = require('glob');
const path = require('path');
const fs = require('fs');
const cpfork = require('child_process').fork;
const numCPUs = require('os').cpus().length;
const { app, ipcMain } = require('electron');

const imageChild = `${app.getAppPath()}/main/childs/imageCheck.js`;

const CACHE_FILE_NAME = 'search_picture_cache.txt';

ipcMain.on('api-search-req', (event, arg) => {
  search(arg).then((data) => {
    event.sender.send('api-search-res', data);
  }).catch((err) => {
    console.log(err);
    event.sender.send('api-search-res', err.message || err);
  });
});

const getFiles = (inputFolder) => {
  console.log(`getFiles from ${inputFolder}`);
  return new Promise((resolve, reject) => {
    fs.readFile(`${inputFolder}/${CACHE_FILE_NAME}`, 'utf8', (err, data) => {
      if (err) {
        console.log('need to create cache file');
        console.log('running glob...');
        glob(`${inputFolder}/**/*.{jpg,png}`, { nodir: true }, (globErr, files) => {
          if (globErr) {
            reject(globErr);
          } else {
            resolve({ files, isCache: false });
          }
        });
      } else {
        console.log('get data from cache.');
        let files;
        try {
          files = JSON.parse(data);
          resolve({ files, isCache: true });
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }
    });
  });
};

const search = (query) => {
  console.log('search...');
  return Promise.resolve().then(() => {
    return getFiles(query.inputFolder);
  }).then((data) => {
    console.log(`files count : ${data.files.length}`);
    if (data.isCache) {
      return data.files;
    }
    if (data.files.length === 0) {
      return Promise.resolve(['msg', 'search result is zero']);
    }
    return new Promise((resolve) => {
      let workerCount = 0;
      let checkedData = [];
      const workers = [];
      const dataCopy = [...data.files];
      const singleCount = Math.ceil(data.files.length / numCPUs);
      const workOnMessage = (m) => {
        checkedData = checkedData.concat(m.checkedData);
        workerCount += 1;
        console.log(`child:${m.id} is close. now total finished:${checkedData.length}/${data.files.length}`);
        if (workerCount === numCPUs) {
          console.log('all childs finished.');
          resolve(checkedData);
          console.log(`writting ${CACHE_FILE_NAME}.`);
          fs.writeFile(`${query.inputFolder}/${CACHE_FILE_NAME}`, JSON.stringify(checkedData), (writeErr) => {
            if (writeErr) {
              console.log(writeErr);
            } else {
              console.log(`${CACHE_FILE_NAME} is created.`);
            }
          });
        }
        workers[m.id].kill();
      };
      for (let i = 1; i <= numCPUs; i += 1) {
        const singleData = dataCopy.splice(0, singleCount + 1);
        const worker = cpfork(imageChild);
        worker.send({
          id: i - 1,
          data: singleData,
        });
        worker.on('message', workOnMessage);
        workers.push(worker);
      }
    });
  }).then((data) => {
    const filterData = [];
    if ((query.w && query.h) || (query.rw && query.rh)) {
      data.forEach((file) => {
        if (query.w && query.h &&
          Number.parseInt(query.w, 0) === file.w &&
          Number.parseInt(query.h, 0) === file.h) {
          filterData.push(file);
        } else if (query.rw && query.rh && (file.w / file.h).toFixed(2) ===
          (Number.parseInt(query.rw, 0) / Number.parseInt(query.rh, 0)).toFixed(2)) {
          filterData.push(file);
        }
      });
    } else {
      console.log('conditions error');
      filterData.push('msg');
      filterData.push(`conditions error, but ${CACHE_FILE_NAME} has created.`);
    }
    return filterData;
  }).then((data) => {
    if (!data.includes('msg') && query.outputFolder) {
      console.log(`filter count : ${data.length}`);
      console.log(`output search result to ${query.outputFolder}`);
      const outputPath = `${query.outputFolder}/search-${new Date().toLocaleString().replace(/ /, '_').replace(/:/g, '-')}`;
      const logTimes = 4;
      const logCount = Math.ceil(data.length / logTimes);
      data.forEach((file, index) => {
        try {
          const filename = path.basename(file.n);
          const readStream = fs.createReadStream(file.n);
          if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
          }
          const writeStream = fs.createWriteStream(`${outputPath}/${filename}`);
          readStream.pipe(writeStream);
          if (index + 1 !== data.length) {
            for (let i = 1; i <= logTimes; i += 1) {
              if (index + 1 === logCount * i) {
                console.log(`output: ${index + 1}/${data.length}`);
              }
            }
          } else {
            console.log(`output: ${index + 1}/${data.length}`);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    console.log('finish...');
    return data;
  });
};

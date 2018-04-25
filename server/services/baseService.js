/* eslint-disable no-console */
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const cpfork = require('child_process').fork;
const numCPUs = require('os').cpus().length;

const imageChild = `${global.rootpath}/server/childs/imageCheck.js`;

// /Users/barneyzhao/local-web-server

const getFiles = (query) => {
  console.log('getFiles');
  return new Promise((resolve, reject) => {
    fs.readFile(`${query.inputFolder}/filenamecacheForsearch.txt`, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        console.log('running glob...');
        glob(`${query.inputFolder}/**/*.{jpg,png}`, { nodir: true }, (globErr, files) => {
          if (globErr) {
            reject(globErr);
          } else {
            resolve(files);
            fs.writeFile(`${query.inputFolder}/filenamecacheForsearch.txt`, JSON.stringify(files), (writeErr) => {
              if (writeErr) {
                console.log(writeErr);
              } else {
                console.log('filenamecacheForsearch.txt is created.');
              }
            });
          }
        });
      } else {
        console.log('get data from cache.');
        let files;
        try {
          files = JSON.parse(data);
          resolve(files);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }
    });
  });
};

exports.search = (query) => {
  console.log('search...');
  return getFiles(query).then((data) => {
    console.log(`files count : ${data.length}`);
    return data;
  }).then((data) => {
    console.log('query start...');
    return new Promise((resolve) => {
      if (query.w || query.h || query.rw || query.rh) {
        let workerCount = 0;
        let filterData = [];
        let finishedCount = 0;
        const workers = [];
        const dataCopy = [...data];
        const singleCount = Math.ceil(data.length / numCPUs);
        const workOnMessage = (m) => {
          filterData = filterData.concat(m.filterData);
          workerCount += 1;
          finishedCount += m.handleData;
          if (workerCount === numCPUs) {
            resolve(filterData);
          }
          console.log(`child:${m.id} is close. finished:${finishedCount}/${data.length} result:${m.filterData.length}`);
          workers[m.id].kill();
        };
        for (let i = 1; i <= numCPUs; i += 1) {
          const singleData = dataCopy.splice(0, singleCount + 1);
          const worker = cpfork(imageChild);
          worker.send({
            id: i - 1,
            data: singleData,
            query,
          });
          worker.on('message', workOnMessage);
          workers.push(worker);
        }
      } else {
        resolve(data);
      }
    });
  }).then((data) => {
    console.log(`filter count : ${data.length}`);
    console.log('finish...');
    if (query.outputFolder) {
      const outputPath = `${query.outputFolder}/searchpicture${new Date().toLocaleDateString().replace(/\//g, '-')}-${new Date().getTime()}`;
      data.forEach((file) => {
        try {
          const filename = path.basename(file);
          const readStream = fs.createReadStream(file);
          if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
          }
          const writeStream = fs.createWriteStream(`${outputPath}/${filename}`);
          readStream.pipe(writeStream);
        } catch (error) {
          console.log(error);
        }
      });
    }
    return data;
  });
};

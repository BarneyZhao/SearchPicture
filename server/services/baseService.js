const glob = require('glob');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

// /Users/barneyzhao/local-web-server

const getFiles = (query) => {
  console.log('getFiles');
  return new Promise((resolve, reject) => {
    glob(`${query.inputFolder}/**/*.{jpg,png}`, { nodir: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

exports.search = (query) => {
  console.log('search');
  console.log(query);
  return getFiles(query).then((data) => {
    console.log(`files count : ${data.length}`);
    return data;
  }).then((data) => {
    const filterData = [];
    data.forEach((file) => {
      const image = sizeOf(file);
      if (query.w && Number.parseInt(query.w, 0) === image.width) {
        filterData.push(file);
      }
      if (query.h && Number.parseInt(query.h, 0) === image.height) {
        filterData.push(file);
      }
      if (query.rh && query.rw && (image.width / image.height).toFixed(2) ===
        (Number.parseInt(query.rw, 0) / Number.parseInt(query.rh, 0)).toFixed(2)) {
        filterData.push(file);
      }
    });
    return filterData.length === 0 ? data : filterData;
  }).then((data) => {
    if (query.outputFolder) {
      data.forEach((file) => {
        const filename = path.basename(file);
        const readStream = fs.createReadStream(file);
        const writeStream = fs.createWriteStream(`${query.outputFolder}/${filename}`);
        readStream.pipe(writeStream);
      });
    }
    return data;
  });
};

// process.on('message', (m) => {
//   console.log(m);
//   getFiles();
// });

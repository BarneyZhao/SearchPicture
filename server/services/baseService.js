/* eslint-disable no-console */
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

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
  console.log('search');
  console.log(query);
  return getFiles(query).then((data) => {
    console.log(`files count : ${data.length}`);
    return data;
  }).then((data) => {
    const filterData = [];
    data.forEach((file, index) => {
      let image;
      try {
        image = sizeOf(file);
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
      } catch (e) {
        console.log(`${file} occurs error`);
        console.log(e);
      }
      if (index % 100 === 0) {
        console.log(`image check:${index}`);
      }
    });
    return filterData.length === 0 ? data : filterData;
  }).then((data) => {
    console.log(`filter count : ${data.length}`);
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

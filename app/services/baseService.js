const path = require('path');
const fs = require('fs');

const services = require(`${__dirname}/../../microServices/imageService.js`);

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

exports.search = services.search;

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

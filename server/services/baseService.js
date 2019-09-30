const fs = require('fs');
const services = require(`${__dirname}/../../microServices/imageService.js`);

exports.getImage = (fileName) => {
  return new Promise((resolve, reject) => {
    if (!fileName) return;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.search = services.search;

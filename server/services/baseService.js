const fs = require('fs');

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

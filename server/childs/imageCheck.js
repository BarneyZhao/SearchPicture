/* eslint-disable no-console */
const sizeOf = require('image-size');

const handler = ({ id, data }) => {
  console.log(`child:${id} is start...`);
  const checkedData = [];
  const logTimes = 4;
  const logCount = Math.ceil(data.length / logTimes);
  data.forEach((file, index) => {
    let image;
    try {
      image = sizeOf(file);
      checkedData.push({
        n: file,
        w: image.width,
        h: image.height,
      });
    } catch (e) {
      console.log('sizeOf occurs error');
      console.log(file);
    }
    // log stuff
    if (index + 1 !== data.length) {
      for (let i = 1; i <= logTimes; i += 1) {
        if (index + 1 === logCount * i) {
          console.log(`child:${id} check ${index + 1}/${data.length}`);
        }
      }
    } else {
      console.log(`child:${id} check ${index + 1}/${data.length}`);
    }
  });
  process.send({ id, checkedData });
};

process.on('message', (m) => {
  handler(m);
});

const sizeOf = require('image-size');

const handler = ({ id, thisThreadHandleFiles }) => {
  console.log(`child:${id} is start...`);
  const checkedImages = [];
  // const logTimes = 4;
  // const logCount = Math.ceil(thisThreadHandleFiles.length / logTimes);
  thisThreadHandleFiles.forEach((filePath, index) => {
    let image;
    try {
      image = sizeOf(filePath);
      checkedImages.push({
        n: filePath,
        w: image.width,
        h: image.height,
      });
    } catch (e) {
      console.log('sizeOf occurs error', e);
      console.log(filePath);
    }
    // log stuff
    // if (index + 1 !== thisThreadHandleFiles.length) {
    //   for (let i = 1; i <= logTimes; i += 1) {
    //     if (index + 1 === logCount * i) {
    //       console.log(`child:${id} check ${index + 1}/${thisThreadHandleFiles.length}`);
    //     }
    //   }
    // } else {
    //   console.log(`child:${id} check ${index + 1}/${thisThreadHandleFiles.length}`);
    // }
  });
  process.send({ id, checkedImages });
};

process.on('message', (m) => {
  handler(m);
});

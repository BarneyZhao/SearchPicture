/* eslint-disable no-console */
const sizeOf = require('image-size');

const handler = ({ id, data, query }) => {
  console.log(`child:${id} is start...`);
  const filterData = [];
  data.forEach((file) => {
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
      console.log('sizeOf occurs error');
      console.log(file);
      // console.log(e);
    }
  });
  process.send({
    id,
    filterData,
    handleData: data.length,
  });
};

process.on('message', (m) => {
  handler(m);
});

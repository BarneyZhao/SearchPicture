
const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');

(async function asyncFunction (path) {
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const rows = await pool.query('select path from pic_info');
    console.log('database record : ' + rows.length);
    const needCheckImages = files.filter(file => !rows.find(row => row.path === file));
    console.log('new image count : ' + needCheckImages.length);
    const checkedImages = await services.checkImages(needCheckImages);
    const nowTime = Date.now();
    // eslint-disable-next-line no-restricted-syntax
    for (const image of checkedImages) {
      const sql = `
        insert into pic_info
        (path, width, height, aspect_ratio, like_num, dislike_num, create_time, update_time)
        value
        ('${image.n}',${image.w},${image.h},${(image.w / image.h).toFixed(2)},0,0,'${nowTime}','${nowTime}')
      ;`;
      // eslint-disable-next-line no-await-in-loop
      const res = await pool.query(sql).catch((err) => {
        console.log(`${image.n} insert err:`);
        console.log(err);
      });
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  } finally {
    // if (conn) conn.end();
    if (pool) pool.end();
  }
})(config.search_folder);


const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');

(async function asyncFunction (path) {
  console.log(`clean db in path: ${path}`);
  const errList = [];
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const rows = await pool.query(`select path from pic_info where path like '${path}%';`);
    console.log('database record : ' + rows.length);
    const needCleanImages = rows.filter(row => !files.find(file => file === row.path));
    console.log('unexist image count : ' + needCleanImages.length);
    // const checkedImages = await services.checkImages(needCheckImages);
    // eslint-disable-next-line no-restricted-syntax
    for (const image of needCleanImages) {
      const sql = `delete from pic_info where path = '${image.path}';`;
      // eslint-disable-next-line no-await-in-loop
      const res = await pool.query(sql).catch((err) => {
        errList.push({
          n: image.path,
          err,
        });
        return `delete err!`;
      });
      console.log(res, `path: ${image.path}`);
    }
    if (errList.length > 0) console.log(JSON.stringify(errList));
  } catch (err) {
    console.log(err);
  } finally {
    if (pool) pool.end();
  }
})(config.search_folder);

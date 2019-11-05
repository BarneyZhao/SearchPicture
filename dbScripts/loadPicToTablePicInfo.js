const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');
const path = config.pic_folder;

/**
 * 1.glob path 下的文件
 * 2.查询表里已有的path
 * 3.筛出表里还没有记录的file
 * 4.image-size 加载出图片宽高
 * 5.插入表
 */
exports.loadPicToTablePicInfo = async () => {
  console.log(`update db in path: ${path}`);
  const errList = [];
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const rows = await pool.query(`select path from pic_info where path like '${path}%';`);
    console.log('database record : ' + rows.length);
    const needCheckImages = files.filter(file => !rows.find(row => row.path === file));
    console.log('new image count : ' + needCheckImages.length);
    const checkedImages = await services.checkImages(needCheckImages);
    if (checkedImages.length === 0) {
      console.log('无新纪录');
      return;
    }
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
        errList.push({
          n: image.n,
          err,
        });
        return `insert err!`;
      });
      console.log(res, `path: ${image.n}`);
    }
    if (errList.length > 0) console.log(JSON.stringify(errList));
  } catch (err) {
    console.log(err);
  } finally {
    if (pool) pool.end();
  }
};

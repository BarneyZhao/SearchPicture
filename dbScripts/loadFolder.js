
const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');

const insertPics = async (images, folderId, nowTime, errList) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const image of images) {
    const sql = `
      insert into folder_pic
      (folder_id, path, create_time, update_time)
      value
      (${folderId},'${image}','${nowTime}','${nowTime}')
    ;`;
    // eslint-disable-next-line no-await-in-loop
    const res = await pool.query(sql).catch((err) => {
      errList.push({
        n: image,
        err,
      });
      return `insert err!`;
    });
    console.log(res, `path: ${image}`);
  }
};

(async function asyncFunction (path) {
  console.log(`load comic in path: ${path}`);
  const errList = [];
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const folderObj = {};
    files.forEach(file => {
      const folderPath = file.slice(0, file.lastIndexOf('/'));
      if (!folderObj[folderPath]) folderObj[folderPath] = [];
      folderObj[folderPath].push(file);
    });
    const rows = await pool.query(`select path from folder where path like '${path}%';`);
    console.log('database folder record : ' + rows.length);
    rows.forEach(row => {
      delete folderObj[row.path];
    });
    const folderObjArray = Object.entries(folderObj);
    let [{ dbFolderId }] = await pool.query('select max(id) as dbFolderId from folder;');
    const nowTime = Date.now();
    // eslint-disable-next-line no-restricted-syntax
    for (const folder of folderObjArray) {
      const sql = `
        insert into folder
        (path, cover, like_num, dislike_num, create_time, update_time)
        value
        ('${folder[0]}','${folder[1][0]}',0,0,'${nowTime}','${nowTime}')
      ;`;
      // eslint-disable-next-line no-await-in-loop
      const res = await pool.query(sql).catch((err) => {
        errList.push({
          n: folder[0],
          err,
        });
        return 'insert err!';
      });
      console.log('folder insert:');
      console.log(res, `path: ${folder[0]}`);
      if (res !== 'insert err!') {
        dbFolderId += 1;
        await insertPics(folder[1], dbFolderId, nowTime, errList);
      }
    }

    if (errList.length > 0) console.log(JSON.stringify(errList));
  } catch (err) {
    console.log(err);
  } finally {
    if (pool) pool.end();
  }
})(config.pack_folder);

const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');
const path = config.pack_folder;

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
    console.log(res, `folderId: ${folderId}, path: ${image}`);
  }
};

/**
 * 1.glob path 下文件
 * 2.归类成文件夹形式obj
 * 3.查出表里已有数据
 * 4.去除obj中已有记录的folder
 * 5.查出Folder表自增id
 * 6.插入folder数据和 folder_pic 数据
 */
exports.loadFoler = async () => {
  console.log(`load folder in path: ${path}`);
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
    if (folderObjArray.length === 0) {
      console.log('无新纪录');
      return;
    }
    let [{ dbFolderId }] = await pool.query('SELECT auto_increment as dbFolderId FROM information_schema.tables where table_schema="myNas" and table_name="folder";');
    console.log(`当前folder自增id为 ${dbFolderId}`);
    dbFolderId -= 1;
    const nowTime = Date.now();
    // eslint-disable-next-line no-restricted-syntax
    for (const folder of folderObjArray) {
      const [folderPath, picPaths] = folder;
      const sql = `
        insert into folder
        (path, cover, pages, like_num, dislike_num, create_time, update_time)
        value
        ('${folderPath}','${picPaths[0]}',${picPaths.length},0,0,'${nowTime}','${nowTime}')
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
};

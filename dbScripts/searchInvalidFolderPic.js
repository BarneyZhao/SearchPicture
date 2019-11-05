const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');
const path = config.pack_folder;

exports.searchInvalidFolderPic = async () => {
  console.log(`load folder in path: ${path}`);
  const errList = [];
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const rows = await pool.query(`select id, path from folder_pic where path like '${path}%';`);
    console.log('database folder_pic record : ' + rows.length);
    const needCheckPics = rows.filter(row => !files.includes(row.path));
    if (needCheckPics.length === 0) console.log('没有无效记录');
    else console.log(needCheckPics);

    if (errList.length > 0) console.log(JSON.stringify(errList));
  } catch (err) {
    console.log(err);
  } finally {
    if (pool) pool.end();
  }
};

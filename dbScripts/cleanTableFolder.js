const inquirer = require('inquirer');
const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');
const path = config.pack_folder;

exports.cleanTableFolder = async () => {
  console.log(`load comic in path: ${path}`);
  const errList = [];
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const folderSet = new Set();
    files.forEach(file => {
      const folderPath = file.slice(0, file.lastIndexOf('/'));
      folderSet.add(folderPath);
    });
    const rows = await pool.query(`select id, path from folder where path like '${path}%';`);
    console.log('database folder record : ' + rows.length);
    const needCleanFolders = rows.filter(row => !Array.from(folderSet).includes(row.path));

    if (needCleanFolders.length > 0) {
      const prompt = await inquirer.prompt([{
        type: 'confirm',
        name: 'ans',
        message: `当前无效folder记录: ${needCleanFolders.length}, 是否打印`,
      }]);
      if (prompt.ans) {
        console.log(needCleanFolders);
      }
      const prompt2 = await inquirer.prompt([{
        type: 'confirm',
        name: 'ans',
        message: `当前无效folder记录: ${needCleanFolders.length}, 是否清理`,
      }]);
      if (prompt2.ans) {
        const folderIds = needCleanFolders.map(f => f.id).join(',');
        const res = await pool.query(`delete from folder_pic where folder_id in (${folderIds});`);
        console.log('folder_pic', res);
        const res1 = await pool.query(`delete from folder where id in (${folderIds});`);
        console.log('folder', res1);
      }
    } else {
      console.log('没有无效记录');
    }

    if (errList.length > 0) console.log(JSON.stringify(errList));
  } catch (err) {
    console.log(err);
  } finally {
    if (pool) pool.end();
  }
};

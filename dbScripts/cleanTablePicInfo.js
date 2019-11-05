const inquirer = require('inquirer');
const pool = require('../server/dbPool');
const services = require('../microServices/imageService');
const config = require('../config.json');
const path = config.pic_folder;

/**
 * 1.glob文件夹下文件
 * 2.查询该路径的数据库记录
 * 3.筛出文件不存在的数据库记录
 * 4.删除该记录
 */
exports.cleanTablePicInfo = async () => {
  console.log(`clean table pic_info in path: ${path}`);
  const errList = [];
  try {
    const files = await services.getFiles(path);
    console.log('glob files count : ' + files.length);
    const rows = await pool.query(`select id, path from pic_info where path like '${path}%';`);
    console.log('database record : ' + rows.length);
    const needCleanImages = rows.filter(row => !files.find(file => file === row.path));

    if (needCleanImages.length > 0) {
      const prompt = await inquirer.prompt([{
        type: 'confirm',
        name: 'ans',
        message: `当前无效 image 记录: ${needCleanImages.length}, 是否打印`,
      }]);
      if (prompt.ans) {
        console.log(needCleanImages);
      }
      const prompt2 = await inquirer.prompt([{
        type: 'confirm',
        name: 'ans',
        message: `当前无效 image 记录: ${needCleanImages.length}, 是否清理`,
      }]);
      if (prompt2.ans) {
        const imageIds = needCleanImages.map(f => f.id).join(',');
        const res = await pool.query(`delete from pic_info where id in (${imageIds});`);
        console.log('pic_info', res);
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

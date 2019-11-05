const inquirer = require('inquirer');
const loadPicToTablePicInfo = require('./loadPicToTablePicInfo');
const cleanTablePicInfo = require('./cleanTablePicInfo');
const loadFolder = require('./loadFolder');
const cleanTableFolder = require('./cleanTableFolder');
const searchInvalidFolderPic = require('./searchInvalidFolderPic');

inquirer.prompt([{
  type: 'list',
  name: 'ans',
  message: '选择脚本',
  choices: [{
    name: '更新 pic_info 表数据',
    value: loadPicToTablePicInfo,
  }, {
    name: '清洗 pic_info 表数据',
    value: cleanTablePicInfo,
  }, {
    name: '更新 folder 表数据',
    value: loadFolder,
  }, {
    name: '清洗 folder 表数据',
    value: cleanTableFolder,
  }, {
    name: '检查 folder_pic 表数据',
    value: searchInvalidFolderPic,
  }],
}]).then(({ ans }) => {
  Object.entries(ans).forEach(([k, v]) => { v(); });
});

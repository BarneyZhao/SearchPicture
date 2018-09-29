const { ipcMain } = require('electron');
const ipc = require('../utils/ipcStr.js');
const service = require('../services/baseService.js');

ipcMain.on(ipc.req('search'), (event, arg) => {
  service.search(arg).then((data) => {
    event.sender.send(ipc.res('search'), data);
  }).catch((err) => {
    console.log(err);
    event.sender.send(ipc.res('search'), err.message || err);
  });
});
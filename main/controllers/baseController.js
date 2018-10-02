const { app, ipcMain } = require('electron');
const ipc = require(`${app.getAppPath()}/main/utils/ipcStr.js`);
const service = require(`${app.getAppPath()}/main/services/baseService.js`);

ipcMain.on(ipc.req('search'), (event, arg) => {
  service.search(arg).then((data) => {
    event.sender.send(ipc.res('search'), data);
  }).catch((err) => {
    console.log(err);
    event.sender.send(ipc.res('search'), err.message || err);
  });
});
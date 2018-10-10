const { app, ipcMain } = require('electron');
const ipc = require(`${app.getAppPath()}/app/utils/ipcStr.js`);
const service = require(`${app.getAppPath()}/app/services/baseService.js`);

ipcMain.on(ipc.req('search'), (event, arg) => {
  service.search(arg).then((data) => {
    event.sender.send(ipc.res('search'), data);
  }).catch((err) => {
    console.log(err);
    event.sender.send(ipc.res('search'), err.message || err);
  });
});

ipcMain.on(ipc.req('exportToFolder'), (event, arg) => {
  service.exportToFolder(arg).then((data) => {
    event.sender.send(ipc.res('exportToFolder'), data);
  }).catch((err) => {
    console.log(err);
    event.sender.send(ipc.res('exportToFolder'), err.message || err);
  });
});
const { app } = require('electron');
const ipc = require(`${app.getAppPath()}/app/utils/ipc.js`);
const service = require(`${app.getAppPath()}/app/services/baseService.js`);

ipc.on('search', service.search);

ipc.on('exportToFolder', service.exportToFolder);
const { app, ipcMain } = require('electron');
const config = require(`${app.getAppPath()}/config.json`);

const str = {
  req (name) {
    return config.ipc_format.req.replace('{0}', name);
  },
  res (name) {
    return config.ipc_format.res.replace('{0}', name);
  },
};

const funcs = {
  on (name, service) {
    ipcMain.on(str.req(name), (event, arg) => {
      service(arg).then((data) => {
        event.sender.send(str.res(name), data);
      }).catch((err) => {
        console.log(err);
        event.sender.send(str.res(name), err.message || err);
      });
    });
  },
};

module.exports = funcs;
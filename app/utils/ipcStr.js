const { app } = require('electron');
const config = require(`${app.getAppPath()}/config.json`);

const funcs = {
  req (name) {
    return config.ipc_format.req.replace('{0}', name);
  },
  res (name) {
    return config.ipc_format.res.replace('{0}', name);
  },
};

module.exports = funcs;
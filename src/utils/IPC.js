/**
 * IPC: Inter-Process Communication
 */
import config from '~/config.json';
const { ipcRenderer } = window.require('electron');

const funcs = {
  req (name) {
    return config.ipc_format.req.replace('{0}', name);
  },
  res (name) {
    return config.ipc_format.res.replace('{0}', name);
  },
};

const ipc = {
  req ({ name, params }) {
    return new Promise((resolve) => {
      ipcRenderer.removeAllListeners(funcs.res(name));
      ipcRenderer.on(funcs.res(name), (evt, arg) => {
        resolve(arg);
      });
      ipcRenderer.send(funcs.req(name), params);
    });
  },
};

export default ipc;
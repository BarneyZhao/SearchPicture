/**
 * IPC: Inter-Process Communication
 */
import config from '~/config.json';
const { ipcRenderer, remote } = window.require('electron');

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
      ipcRenderer.once(funcs.res(name), (evt, arg) => {
        console.log('res:', name, arg);
        resolve(arg);
      });
      console.log('req:', name, params);
      ipcRenderer.send(funcs.req(name), params);
    });
  },
  remote,
};

export default ipc;
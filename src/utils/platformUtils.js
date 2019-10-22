/**
 * IPC: Inter-Process Communication
 */
import axios from 'axios';
import config from '~/config.json';
let { ipcRenderer, remote, shell } = {};
if (window.require) {
  ({ ipcRenderer, remote, shell } = window.require('electron'));
}

const funcs = {
  req (name) {
    return config.ipc_format.req.replace('{0}', name);
  },
  res (name) {
    return config.ipc_format.res.replace('{0}', name);
  },
};

const platformUtils = window.require ? {
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
  shell,
} : {
  req ({ name, params }) {
    return axios({
      method: 'post',
      url: '/api/' + name,
      data: params,
    }).then(data => data.data);
  },
};

export default platformUtils;
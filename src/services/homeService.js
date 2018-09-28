const { ipcRenderer } = window.require('electron');

const service = {
  search (params) {
    return new Promise((resolve) => {
      ipcRenderer.removeAllListeners('api-search-res');
      ipcRenderer.on('api-search-res', (evt, arg) => {
        console.log(arg);
        resolve(arg);
      });
      ipcRenderer.send('api-search-req', params);
    });
  },
};

export default service;
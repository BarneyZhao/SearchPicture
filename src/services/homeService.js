import ipc from '@/utils/IPC.js';

const service = {
  selectFolder (type) {
    return new Promise((resolve) => {
      if (type === 'open') {
        ipc.remote.dialog.showOpenDialog({
          properties: ['openDirectory']
        }, resolve);
      } else {
        let date = new Date();
        let dp = `search_result_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
        ipc.remote.dialog.showSaveDialog({
          defaultPath: dp
        }, resolve);
      }
    });
  },
  search (params) {
    return ipc.req({
      name: 'search',
      params,
    });
  },
  setFullscreen (param) {
    ipc.remote.getCurrentWindow().setFullScreen(param);
  },
  exportToFolder (params) {
    return ipc.req({
      name: 'exportToFolder',
      params,
    });
  },
};

export default service;
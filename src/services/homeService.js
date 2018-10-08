import ipc from '@/utils/IPC.js';

const service = {
  selectSearchFloder () {
    return new Promise((resolve) => {
      ipc.remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      }, resolve);
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
};

export default service;
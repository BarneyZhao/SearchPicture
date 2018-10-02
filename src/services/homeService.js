import ipc from '@/utils/IPC.js';

const service = {
  search (params) {
    return ipc.req({
      name: 'search',
      params,
    });
  },
  setFullscreen (params) {
    return ipc.req({
      name: 'full-screen',
      params,
    });
  },
};

export default service;
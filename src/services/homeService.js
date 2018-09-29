import ipc from '@/utils/IPC.js';

const service = {
  search (params) {
    return ipc.req({
      name: 'search',
      params
    });
  },
};

export default service;
import eu from '@/utils/platformUtils';

const service = {
  getFolderList () {
    return eu.req({
      name: 'folder',
    });
  },
};

export default service;
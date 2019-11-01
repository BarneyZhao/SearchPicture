import eu from '@/utils/platformUtils';

const service = {
  getFolderList () {
    return eu.req({
      name: 'folder',
    });
  },
  getFolderPics (params) {
    return eu.req({
      name: 'folder/pic',
      params,
    });
  },
  setFolderKeyword (params) {
    return eu.req({
      name: 'folder/keyword',
      params,
    });
  },
};

export default service;
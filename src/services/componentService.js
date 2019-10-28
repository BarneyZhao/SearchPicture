import eu from '@/utils/platformUtils';

const service = {
  likeOrDislike (params) {
    return eu.req({
      name: 'pic/likeOrDislike',
      params,
    });
  },
};

export default service;
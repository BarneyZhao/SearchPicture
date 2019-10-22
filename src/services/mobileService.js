import eu from '@/utils/platformUtils';

const service = {
  searchByRandom (params) {
    return eu.req({
      name: 'search/random',
      params,
    });
  },
  likeOrDislike (params) {
    return eu.req({
      name: 'pic/likeOrDislike',
      params,
    });
  },
};

export default service;
import eu from '@/utils/platformUtils';

const service = {
  searchByRandom (params) {
    return eu.req({
      name: 'search/random',
      params,
    });
  },
};

export default service;
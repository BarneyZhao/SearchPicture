import eu from '@/utils/platformUtils';

const service = {
  searchBySql (params) {
    return eu.req({
      name: 'search/sql',
      params,
    });
  },
};

export default service;
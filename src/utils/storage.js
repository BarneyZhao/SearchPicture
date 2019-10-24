const storage = {
  session: {
    get: function (key) {
      const dataStr = window.sessionStorage.getItem(key);
      return dataStr && JSON.parse(dataStr);
    },
    set: function (key, data) {
      const dataStr = JSON.stringify(data);
      window.sessionStorage.setItem(key, dataStr);
    },
    remove: function (key) {
      window.sessionStorage.removeItem(key);
    }
  },
  local: {
    get: function (key) {
      const dataStr = window.localStorage.getItem(key);
      return dataStr && JSON.parse(dataStr);
    },
    set: function (key, data) {
      const dataStr = JSON.stringify(data);
      window.localStorage.setItem(key, dataStr);
    },
    remove: function (key) {
      window.localStorage.removeItem(key);
    }
  }
};
export default storage;

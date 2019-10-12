import eu from '@/utils/platformUtils';

const service = {
  selectFolder (type, conditionStr) {
    return new Promise((resolve) => {
      if (type === 'open') {
        eu.remote.dialog.showOpenDialog({
          properties: ['openDirectory']
        }, resolve);
      } else {
        let date = new Date();
        let dp = `search_result_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_by_${conditionStr}`;
        eu.remote.dialog.showSaveDialog({
          defaultPath: dp
        }, resolve);
      }
    });
  },
  search (params) {
    return eu.req({
      name: 'search',
      params,
    });
  },
  searchBySql (params) {
    return eu.req({
      name: 'search/sql',
      params,
    });
  },
  toggleFullscreen () {
    let cw = eu.remote.getCurrentWindow();
    let isFullScreen = cw.isFullScreen();
    if (process.platform === 'win32') {
      cw.setMenuBarVisibility(isFullScreen);
    }
    cw.setFullScreen(!isFullScreen);
  },
  exportToFolder (params) {
    return eu.req({
      name: 'exportToFolder',
      params,
    });
  },
  showContextMenu (item) {
    let menuTemp = [
      {
        label: '打开文件',
        click () {
          eu.shell.openItem(item.n);
        },
      },
      {
        label: '打开文件所在文件夹',
        click () {
          eu.shell.showItemInFolder(item.n);
        },
      },
    ];
    let menu = eu.remote.Menu.buildFromTemplate(menuTemp);
    menu.popup(eu.remote.getCurrentWindow());
  },
};

export default service;
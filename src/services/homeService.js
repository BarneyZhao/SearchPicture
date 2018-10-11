import eu from '@/utils/electronUtils.js';

const service = {
  selectFolder (type) {
    return new Promise((resolve) => {
      if (type === 'open') {
        eu.remote.dialog.showOpenDialog({
          properties: ['openDirectory']
        }, resolve);
      } else {
        let date = new Date();
        let dp = `search_result_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
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
  setFullscreen (param) {
    eu.remote.getCurrentWindow().setFullScreen(param);
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
        label: '打开文件所在文件夹',
        // accelerator: 'CmdOrCtrl+C',
        click () {
          eu.shell.showItemInFolder(item.n.replace('/api/image?f=', ''));
        },
      },
    ];
    let menu = eu.remote.Menu.buildFromTemplate(menuTemp);
    menu.popup(eu.remote.getCurrentWindow());
  },
};

export default service;
const { app } = require('electron');

const config = {
  WINDOW_OPS: {
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    title: 'Search Picture',
  },
  DEV_URL: 'http://localhost:8080',
  PROD_URL: 'file://{0}/dist/index.html',
  APP_MENUS: [
    {
      label: '窗口',
      role: 'window',
      submenu: [
        { label: '开启/关闭全屏', role: 'togglefullscreen' },
        { label: '重新加载', role: 'reload' },
        { label: '最小化', role: 'minimize' },
        { label: '关闭', role: 'close' },
      ]
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        { label: '开启/关闭开发者模式', role: 'toggledevtools' },
      ]
    },
  ],
  MAC_MENUS: {
    label: app.getName(),
    submenu: [
      { label: '关于 ' + app.getName(), role: 'about' },
      { type: 'separator' },
      { label: '服务', role: 'services', submenu: [] },
      { type: 'separator' },
      { label: '退出 ' + app.getName(), role: 'quit' },
    ]
  }
};

module.exports = config;
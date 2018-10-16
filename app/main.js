// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron');
const mainConfig = require(`${app.getAppPath()}/app/main_config.js`);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let isDev = process.env.NODE_ENV === 'dev';

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow(mainConfig.WINDOW_OPS);

  // and load the index.html of the app.
  let url;
  if (isDev) url = mainConfig.DEV_URL;
  if (!url) url = mainConfig.PROD_URL.replace('{0}', app.getAppPath());
  mainWindow.loadURL(url);

  // Open the DevTools.
  if (isDev) mainWindow.webContents.openDevTools();

  console.log(app.getName());

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

const setAppMenus = () => {
  let template = mainConfig.APP_MENUS;
  if (process.platform === 'darwin') {
    template.unshift(mainConfig.MAC_MENUS);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  setAppMenus();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require(`${app.getAppPath()}/app/controllers/baseController.js`);
if (isDev) require('../server/main.js');

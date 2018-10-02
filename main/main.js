// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const mainConfig = require(`${app.getAppPath()}/main/main_config.js`);
const ipc = require(`${app.getAppPath()}/main/utils/ipcStr.js`);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let isDev = process.env.NODE_ENV === 'dev';

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(mainConfig.WINDOW_OPS);

  // and load the index.html of the app.
  let url;
  if (isDev) url = mainConfig.DEV_URL;
  if (!url) url = mainConfig.PROD_URL.replace('{0}', app.getAppPath());
  mainWindow.loadURL(url);

  // Open the DevTools.
  if (isDev || mainConfig.IS_OPEN_DEV_TOOLS) mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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

ipcMain.on(ipc.req('full-screen'), (event, arg) => {
  mainWindow.setFullScreen(arg);
  event.sender.send(ipc.res('full-screen'), arg);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require(`${app.getAppPath()}/main/controllers/baseController.js`);

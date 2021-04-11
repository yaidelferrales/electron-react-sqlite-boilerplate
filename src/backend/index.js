const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');
const path = require('path');

// Local imports
const sequelize = require('./sequelize');

let mainWindow;

/**
 * Creates the main window for the application
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // Load the page
  const url = isDev
    ? 'http://localhost:17345'
    : `file://${path.join(__dirname, '../frontend/index.html')}`;
  mainWindow.loadURL(url);

  // Remove reference to the main window
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // connect to the database
  ipcMain.once('ui-ready-for-events', event => {
    sequelize
      .init()
      .then(() => {
        mainWindow.webContents.send('app-init-success');
      })
      .catch(err => {
        mainWindow.webContents.send('app-init-failure');
      });
  });
}

/**
 * Handles the initialization of the application once the application
 * sends the ready event. Subscribes the application to the main events
 * from the application.
 */
function onReady() {
  createWindow();

  /**
   * On macOS it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  app.on('activate', () => {
    if (!mainWindow) {
      createWindow();
    }
  });

  /**
   * Quit when all windows are closed, except on macOS. There, it's common
   * for applications and their menu bar to stay active until the user quits
   * explicitly with Cmd + Q.
   */
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin' || isDev) {
      app.quit();
    }
  });
}

// Subscribe to the Ready event calling the onReady function
app.whenReady().then(onReady);



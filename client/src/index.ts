/*
 * Application desktop pour le ClicksCounter
 * Auteur : Pierre BIDET, Elie THOMÉRÉ, Oscar CASALTA
 * Date : 2023_05_05
 * Version : 2.1.0
 * Langage : TypeScript
 * Framework : Electron
 * Licence : CC BY-NC-SA 4.0
 */


import { app, BrowserWindow } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import "./ipc"

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();

};
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
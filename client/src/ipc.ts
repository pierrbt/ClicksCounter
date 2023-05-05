/*
 * Application desktop pour le ClicksCounter
 * Auteur : Pierre BIDET, Elie THOMÉRÉ, Oscar CASALTA
 * Date : 2023_05_05
 * Version : 2.1.0
 * Langage : TypeScript
 * Framework : Electron
 * Licence : CC BY-NC-SA 4.0
 */


import {app, ipcMain} from "electron";
import fs from "fs";


ipcMain.on("getServer", (event, arg) => {
    const path = app.getPath("userData") + "/server.txt";
    if(!fs.existsSync(path)) {
        event.returnValue = false;
        return;
    }
    event.returnValue = fs.readFileSync(app.getPath("userData") + "/server.txt", "utf-8");
    return;
});

ipcMain.on("setServer", (event, arg) => {
    fs.writeFileSync(app.getPath("userData") + "/server.txt", arg);
    event.returnValue = true;
    return;
});
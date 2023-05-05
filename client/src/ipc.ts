/*
 * Application desktop pour le ClicksCounter
 * Auteur : Pierre BIDET, Elie THOMÉRÉ, Oscar CASALTA
 * Date : 2023_05_05
 * Version : 2.1.0
 * Langage : TypeScript
 * Framework : Electron
 * Licence : CC BY-NC-SA 4.0
 */


import { ipcMain, app } from "electron";
import fs from "fs";


ipcMain.on("getPlayers", (event) => {
    const dir = app.getPath("userData") + "/leaderboard";
    console.log(dir);
    if(!fs.existsSync(dir))
        fs.mkdirSync(dir);
    const file = dir + "/data.json";
    if(fs.existsSync(file))
    {
        let data = JSON.parse(fs.readFileSync(file).toString());
        event.returnValue = data;
    }
    else
    {
        fs.writeFileSync(file, "[]");
        event.returnValue = [];
    }
    return;
});



ipcMain.on("addPlayer", (event, player, score) => {
    const dir = app.getPath("userData") + "/leaderboard";
    console.log(dir);
    if(!fs.existsSync(dir))
        fs.mkdirSync(dir);
    const file = dir + "/data.json";
    if(fs.existsSync(file))
    {
        let data = JSON.parse(fs.readFileSync(file).toString());
        data.push({pseudo: player,
            cps: score});
        fs.writeFileSync(file, JSON.stringify(data));
        event.returnValue = data;
    }
    else
    {
        let data = [];
        data.push({pseudo: player,
            cps: score});
        fs.writeFileSync(file, JSON.stringify(data));
        event.returnValue = data;
    }
    return;
})
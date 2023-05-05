/*
 * Application desktop pour le ClicksCounter
 * Auteur : Pierre BIDET, Elie THOMÉRÉ, Oscar CASALTA
 * Date : 2023_05_05
 * Version : 2.1.0
 * Langage : TypeScript
 * Framework : Electron
 * Licence : CC BY-NC-SA 4.0
 */

const { ipcRenderer, contextBridge } = require("electron");


contextBridge.exposeInMainWorld("api", {
        getPlayers: () => {
            const res = ipcRenderer.sendSync("getPlayers");
            return res;
        },
        addPlayer: (pseudo: string, score: any) => {
            const res = ipcRenderer.sendSync("addPlayer", pseudo, score);
            return res;
        }
    }
);
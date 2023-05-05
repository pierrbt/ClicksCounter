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
        getServer: () => {
            return ipcRenderer.sendSync("getServer")
        },
        setServer: (arg: string) => {
            return ipcRenderer.sendSync("setServer", arg)
        }
    }
);
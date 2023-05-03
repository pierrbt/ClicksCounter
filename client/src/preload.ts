

const { ipcRenderer, contextBridge } = require("electron");


contextBridge.exposeInMainWorld("api", {
        sendPing: () => {
            const res = ipcRenderer.sendSync("ping");
            console.log(res);
            return;
        },
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
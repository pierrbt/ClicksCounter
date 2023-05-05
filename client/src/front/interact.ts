/*
 * Application desktop pour le ClicksCounter
 * Auteur : Pierre BIDET, Elie THOMÉRÉ, Oscar CASALTA
 * Date : 2023_05_05
 * Version : 2.1.0
 * Langage : TypeScript
 * Framework : Electron
 * Licence : CC BY-NC-SA 4.0
 */

declare const api: any;
import {loadLeaderboard, savePlayer} from "./classement";

const MAX_TIME = 10

const value = document.getElementsByClassName('score-value')[0] as HTMLInputElement;
const btn = document.getElementsByClassName('circle')[0] as HTMLButtonElement;
const timeV = document.getElementsByClassName('time-value')[0];
const CPS = document.getElementsByClassName('cps')[0];
const logout = document.getElementById("logout-button") as HTMLSpanElement;

let startTime = 0;
let clics: any = [];
let interval: any
let pseudo: string;

let locked = false;

Begin();
setListeners();

async function boutonClic(event: any) {
    if (event.button !== 0) return;

    if (startTime === 0) {
        value.style.transform = 'scale(1)';
        value.style.transition = 'none';
        startTime = Date.now() / 1000;
        interval = setInterval(Update, MAX_TIME);
    }
    clics.push(Date.now() / 1000 - startTime);
    value.innerHTML = clics.length;
}


async function Update() {
    if(locked) return;
    locked = true;
    let t = (Date.now() / 1000) - startTime
    timeV.innerHTML = t.toFixed(1).toString() + "s";

    if(t > 10)
    {
        removeListeners();
        let cps = (clics.length / MAX_TIME).toFixed(2);
        savePlayer(pseudo, cps);
        loadLeaderboard();
        CPS.innerHTML = cps + " CPS";
        value.style.transform = "scale(1.5)";
        value.style.transition = "all 1s ease-in-out";
        startTime = 0;
        clics = [];
        setInterval(setListeners, 5000);
        clearInterval(interval);
    }
    else
    {
        // check time since beginning
        let time = (Date.now() / 1000) - startTime;
        if(time > 3) time = 3;

        const lastClicks = clics.filter( (value: number) => {
            return value > ((Date.now() / 1000) - startTime - time);
        });

        CPS.innerHTML = (lastClicks.length / time).toFixed(2).toString() + " CPS";
    }
    locked = false;
}

function setListeners()
{
    btn.disabled = false;
    btn.addEventListener('mouseup', boutonClic);

}

function removeListeners()
{
    btn.disabled = true;
    btn.removeEventListener('click', boutonClic);
}


function Begin() {
    // Récupération des éléments HTML nécessaires
    const loginDiv = document.getElementsByClassName('login')[0] as HTMLDivElement;
    const valueDiv = document.getElementById('username') as HTMLInputElement;
    const buttonDiv = document.getElementById('confirm') as HTMLButtonElement;

    const serverDiv = document.getElementsByClassName('server')[0] as HTMLDivElement;
    const serverValue = document.getElementById('server') as HTMLInputElement;
    const serverButton = document.getElementById('confirm-server') as HTMLButtonElement;

    // Vérification de l'état de connexion
    if (!api.getServer()) {
        // Affichage des éléments de serveur et masquage des éléments de connexion
        serverDiv.style.display = "flex";
        loginDiv.style.display = "none";

        // Ajout de l'événement de saisie de touche pour le serveur
        serverDiv.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                if (serverValue.value) {
                    api.setServer(serverValue.value);
                    serverDiv.removeEventListener('keydown', () => {});
                    Begin();
                }
            }
        });

        // Ajout de l'événement de clic pour le bouton de serveur
        serverButton.addEventListener('click', () => {
            if (serverValue.value) {
                api.setServer(serverValue.value);
                Begin();
            }
        });
    } else {
        // Masquage des éléments de serveur
        serverDiv.style.display = "none";
        if (!pseudo) {
            // Affichage des éléments de connexion
            loginDiv.style.display = "flex";

            // Ajout de l'événement de saisie de touche pour la connexion
            loginDiv.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    if (valueDiv.value) {
                        pseudo = valueDiv.value;
                        loginDiv.removeEventListener('keydown', () => {});

                        logout.addEventListener('click', () => {
                            pseudo = "";
                            Begin();
                        });

                        Begin();
                    }
                }
            });

            // Ajout de l'événement de clic pour le bouton de connexion
            buttonDiv.addEventListener('click', () => {
                if (valueDiv.value) {
                    pseudo = valueDiv.value;
                    logout.addEventListener('click', () => {
                        pseudo = "";
                        Begin();
                    });
                    Begin();
                }
            });
        } else {
            // Chargement du classement
            loadLeaderboard();
            // Masquage des éléments de connexion
            loginDiv.style.display = "none";
        }
    }
}

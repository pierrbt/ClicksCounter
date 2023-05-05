/*
 * Application desktop pour le ClicksCounter
 * Auteur : Pierre BIDET, Elie THOMÉRÉ, Oscar CASALTA
 * Date : 2023_05_05
 * Version : 2.1.0
 * Langage : TypeScript
 * Framework : Electron
 * Licence : CC BY-NC-SA 4.0
 */

declare const api:any;
const server = "https://veagle.fr";

const players = document.getElementsByClassName('players')[0];

interface Joueur {
    cps: number;
}

export function loadLeaderboard()
{
    /*const data = await fetch("/api/list?order=score", {
        "Method": "GET",
        "Content-Type": "text/plain",
    })
        .then((res) => {
            if(!res.ok)
            {
                throw new Error("Erreur requête");
                return;
            }
            else
            {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Erreur lors du téléchargement des données");
        })

    if(!data)
        return;*/

    const data = [
            {"id":6,"cps":14.9,"user":"pierrbt","date":"2023-05-03 15:50:33"},
            {"id":7,"cps":14.6,"user":"Elie","date":"2023-05-03 15:50:33"},
            {"id":5,"cps":14.2,"user":"Timéo","date":"2023-05-03 15:50:32"},
            {"id":4,"cps":13.6,"user":"Oscar","date":"2023-05-03 15:50:28"},
            {"id":2,"cps":11.4,"user":"Livet","date":"2023-05-03 15:50:27"},
            {"id":3,"cps":10.8,"user":"Nul","date":"2023-05-03 15:50:27"},
            {"id":1,"cps":9.4,"user":"JonCena","date":"2023-05-03 15:50:24"}
        ];


    players.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        console.log((i+1) + ". " + data[i].user + " - " + data[i].cps + " CPS");
        const li = document.createElement("li");
        li.innerHTML = `<b>${i+1}.</b> ${data[i].user} - ${data[i].cps} CPS`;
        players.appendChild(li);
    }
}

export function savePlayer(pseudo: string, cps: any)
{
    fetch(server + `/api/add?user=${pseudo}&score=${cps}`);
}
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

const players = document.getElementsByClassName('players')[0];

interface Joueur {
    cps: number;
}

export async function loadLeaderboard()
{
    const data = await fetch(api.getServer() + "/api/list?order=cps")
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

    console.log(data);

    if(!data)
        return;

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
    fetch(api.getServer() + `/api/add?user=${pseudo}&cps=${cps}`);
}
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
    user: string;
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

    const leaderboard = document.createElement("div");
    leaderboard.classList.add("leaderboard");

    const lead = document.createElement("h3");
    lead.classList.add("lead");
    lead.innerText = "Classement";
    leaderboard.appendChild(lead);

    const table = document.createElement("table");
    table.classList.add("table");

// Créer la ligne d'en-tête du tableau
    const headerRow = document.createElement("tr");
    const rankHeader = document.createElement("th");
    rankHeader.innerText = "Rang";
    headerRow.appendChild(rankHeader);
    const userHeader = document.createElement("th");
    userHeader.innerText = "Joueur";
    headerRow.appendChild(userHeader);
    const scoreHeader = document.createElement("th");
    scoreHeader.innerText = "Score (CPS)";
    headerRow.appendChild(scoreHeader);
    const dateHeader = document.createElement("th");
    dateHeader.innerText = "Date";
    headerRow.appendChild(dateHeader);
    table.appendChild(headerRow);

// Créer les lignes de données du tableau
    for (let i = 0; i < data.length; i++) {
        const row = document.createElement("tr");

        // Rang
        const rankCell = document.createElement("td");
        rankCell.innerText = `${i+1}`;
        row.appendChild(rankCell);

        // Joueur
        const userCell = document.createElement("td");
        userCell.innerText = data[i].user;
        row.appendChild(userCell);

        // Score
        const scoreCell = document.createElement("td");
        scoreCell.innerText = `${data[i].cps.toFixed(2).toString()}`;
        row.appendChild(scoreCell);

        // Date
        const dateCell = document.createElement("td");
        const date = new Date(data[i].date);
        const today = new Date();

        // Décalage horaire
        date.setHours(date.getHours() + 2);

        if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear())
            dateCell.innerText = "Aujourd'hui ";
        else if (date.getDate() == today.getDate()-1 && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear())
            dateCell.innerText = "Hier ";
        else
            dateCell.innerText = `Il y a ${today.getDate() - date.getDate()} jours `;

        dateCell.innerText += `à ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`;

        row.appendChild(dateCell);

        table.appendChild(row);
    }

    leaderboard.appendChild(table);

// Ajouter le tableau au document
    const container = document.querySelector(".container");
    container.innerHTML = "";
    container.appendChild(leaderboard);

}

export async function savePlayer(pseudo: string, cps: any)
{
    await fetch(api.getServer() + `/api/add?user=${pseudo}&cps=${cps}`);
}

setInterval(loadLeaderboard, 1000);
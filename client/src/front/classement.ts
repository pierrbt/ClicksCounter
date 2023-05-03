declare const api:any;

const players = document.getElementsByClassName('players')[0];

interface Joueur {
    cps: number;
}

export function load()
{
    const joueurs = api.getPlayers();

    joueurs.sort(function(a: Joueur, b: Joueur) {
        return b.cps - a.cps;
    });

    console.log("Classement des joueurs :");

    players.innerHTML = "";

    for (let i = 0; i < joueurs.length; i++) {
        console.log((i+1) + ". " + joueurs[i].pseudo + " - " + joueurs[i].cps + " CPS");
        const li = document.createElement("li");
        li.innerHTML = `<b>${i+1}.</b> ${joueurs[i].pseudo} - ${joueurs[i].cps} CPS`;
        players.appendChild(li);
    }
}

load();

export function savePlayer(pseudo: string, cps: any)
{
    api.addPlayer(pseudo, cps);
}
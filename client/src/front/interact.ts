import { savePlayer, loadLeaderboard } from "./classement";

const MAX_TIME = 10

const value = document.getElementsByClassName('score-value')[0] as HTMLInputElement;
const btn = document.getElementsByClassName('circle')[0];
const timeV = document.getElementsByClassName('time-value')[0];
const CPS = document.getElementsByClassName('cps')[0];

let startTime = 0;
let clics: any = [];
let interval: any
let pseudo: string;

Begin();
setListeners();

async function boutonClic() {
    if(startTime === 0)
    {
        value.style.transform = "scale(1)";
        value.style.transition = "none";
        startTime = Date.now() / 1000;
        interval = setInterval(Update, MAX_TIME);
    }
    clics.push((Date.now() / 1000) - startTime);
    value.innerHTML = clics.length;
}


async function Update() {
    let t = (Date.now() / 1000) - startTime
    timeV.innerHTML = t.toFixed(1).toString() + "s";

    if(t > 10)
    {
        let cps = (clics.length / MAX_TIME).toFixed(2);

        const nom = pseudo;
        console.log(nom);

        savePlayer(nom, cps);
        loadLeaderboard();

        CPS.innerHTML = cps + " CPS";

        value.style.transform = "scale(1.5)";
        value.style.transition = "all 1s ease-in-out";

        startTime = 0;
        clics = [];
        removeListeners();
        setInterval(setListeners, 3000);

        clearInterval(interval);
    }
    else
    {
        let lastS = clics.filter( (value: number) => {
            return value > ((Date.now() / 1000) - startTime - 1);
        });

        CPS.innerHTML = lastS.length + " CPS";
    }
}

function setListeners()
{
    btn.addEventListener('click', boutonClic);
    btn.addEventListener('contextmenu', boutonClic);
}

function removeListeners()
{
    btn.removeEventListener('click', boutonClic);
    btn.removeEventListener('contextmenu', boutonClic)
}


function Begin()
{
    const loginDiv = document.getElementsByClassName('login')[0] as HTMLDivElement;
    const valueDiv = document.getElementById('username') as HTMLInputElement;
    const buttonDiv = document.getElementById('confirm') as HTMLButtonElement;
    if(!pseudo)
    {
        loginDiv.style.display = "flex";
        buttonDiv.addEventListener('click', () => {
            if(valueDiv.value)
            {
                pseudo = valueDiv.value;
                Begin();
            }
        });
    }
    else
    {
        loadLeaderboard();
        loginDiv.style.display = "none";
    }
}


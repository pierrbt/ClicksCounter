let lastData;

function isDataEqual(bef, aft)
{
    if (bef.length !== aft.length)
        return false;

    for(let i = 0; i < bef.length; i++)
    {
        if (bef[i].user !== aft[i].user || bef[i].cps !== aft[i].cps || bef[i].date !== aft[i].date)
            return false;
    }

    return true;
}

async function Load()
{
    const data = await fetch("/api/list?order=cps")
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
        return;

    if (lastData && isDataEqual(lastData, data))
    {
        console.log("Hash identique");
        return;
    }
    else
    {
        console.log("Hash différent");
        console.log(data);
    }




    // Parse des données et affichage
    const container = document.getElementById("container");
    const podium = document.getElementsByClassName("podium-users");
    const list = document.getElementById("list");
    const classement = document.getElementById("classement");

    classement.innerHTML = "";

    // do as enumerate() in python
    for(const [index, user] of data.entries())
    {
        const element = document.createElement("div");
        element.classList.add("user");

        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.textContent = index + 1;

        const username = document.createElement("div");
        username.classList.add("username");
        username.textContent = user.user;

        const cps = document.createElement("div");
        cps.classList.add("cps");
        cps.textContent = user.cps.toFixed(1).toString();

        const date = document.createElement("div");
        date.classList.add("date");
        date.textContent = user.date;

        const shotDate = new Date(user.date);
        const today = new Date();

        shotDate.setHours(shotDate.getHours() + 2); // Décalage horaire

        if (shotDate.getDate() === today.getDate() && shotDate.getMonth() === today.getMonth() && shotDate.getFullYear() === today.getFullYear())
            date.innerText = "Aujourd'hui ";
        else if (shotDate.getDate() === today.getDate()-1 && shotDate.getMonth() === today.getMonth() && shotDate.getFullYear() === today.getFullYear())
            date.innerText = "Hier ";
        else
            date.innerText = `Il y a ${today.getDate() - shotDate.getDate()} jours `;

        date.innerText += `à ${shotDate.getHours().toString().padStart(2, "0")}h${shotDate.getMinutes().toString().padStart(2, "0")}`;

        element.appendChild(rank);
        element.appendChild(username);
        element.appendChild(cps);


        if(index < 3)
        {
            podium[index].innerHTML = "";

            if(index === 0)
                podium[index].innerHTML = '<img src="assets/laurier.webp" alt="laurier" class="podium-img">';

            podium[index].appendChild(element);

        }
        else
        {
            element.appendChild(date);
            classement.appendChild(element);
        }
    }

    lastData = data;


}

Load().then(() => {
    setInterval(Load, 1000); // Autorecharge chaque seconde
});


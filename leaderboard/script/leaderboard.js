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




    const podium = document.querySelectorAll(".podium-user");
    const classementBody = document.getElementById("classement-body");

    classementBody.innerHTML = ""; // Supprimer le contenu précédent

    for (const [index, user] of data.entries()) {
        const row = document.createElement("tr");
        row.classList.add("user-row");

        const rankCell = document.createElement("td");
        rankCell.classList.add("rank");
        rankCell.textContent = index + 1;

        const usernameCell = document.createElement("td");
        usernameCell.classList.add("username");
        usernameCell.textContent = user.user;

        const cpsCell = document.createElement("td");
        cpsCell.classList.add("cps");
        cpsCell.textContent = user.cps.toFixed(1).toString();

        const dateCell = document.createElement("td");
        dateCell.classList.add("date");
        const shotDate = new Date(user.date);
        const today = new Date();

        shotDate.setHours(shotDate.getHours() + 2); // Décalage horaire

        if (
            shotDate.getDate() === today.getDate() &&
            shotDate.getMonth() === today.getMonth() &&
            shotDate.getFullYear() === today.getFullYear()
        ) {
            dateCell.innerText = "Aujourd'hui ";
        } else if (
            shotDate.getDate() === today.getDate() - 1 &&
            shotDate.getMonth() === today.getMonth() &&
            shotDate.getFullYear() === today.getFullYear()
        ) {
            dateCell.innerText = "Hier ";
        } else {
            dateCell.innerText = `Il y a ${
                today.getDate() - shotDate.getDate()
            } jours `;
        }

        dateCell.innerText += `à ${shotDate
            .getHours()
            .toString()
            .padStart(2, "0")}h${shotDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

        row.appendChild(rankCell);
        row.appendChild(usernameCell);
        row.appendChild(cpsCell);
        row.appendChild(dateCell);

        if (index < 3) {
            const podiumUser = podium[index];
            podiumUser.innerHTML = ""; // Supprimer le contenu précédent

            if (index === 0) {
                const img = document.createElement("img");
                img.src = "assets/laurier.webp";
                img.alt = "laurier";
                img.classList.add("podium-img");
                podiumUser.appendChild(img);
            }

            podiumUser.appendChild(row);
        } else {
            classementBody.appendChild(row);
        }
    }

    lastData = data;


}

Load().then(() => {
    setInterval(Load, 1000); // Autorecharge chaque seconde
});



async function Load()
{
    /*const data = await fetch("/api/list?order=cps") // Version finale du fetch des données
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

    const data = [ // Exemple des données qu'on recevrait avec la version production
        {"id":6,"cps":14.9,"user":"pierrbt","date":"2023-05-03 15:50:33"},
        {"id":7,"cps":14.6,"user":"Elie","date":"2023-05-03 15:50:33"},
        {"id":5,"cps":14.2,"user":"Timéo","date":"2023-05-03 15:50:32"},
        {"id":4,"cps":13.6,"user":"Oscar","date":"2023-05-03 15:50:28"},
        {"id":2,"cps":11.4,"user":"Livet","date":"2023-05-03 15:50:27"},
        {"id":3,"cps":10.8,"user":"Nul","date":"2023-05-03 15:50:27"},
        {"id":1,"cps":9.4,"user":"JonCena","date":"2023-05-03 15:50:24"}
    ];

    // Parse des données et affichage

}

Load();

setInterval(Load, 5000); // Autorecharge chaque 5s
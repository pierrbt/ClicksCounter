
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

    console.log(data);
    // Parse des données et affichage

}

Load().then(() => {
    setInterval(Load, 1000); // Autorecharge chaque seconde
});


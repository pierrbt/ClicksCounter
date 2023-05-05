
async function Load()
{
    const data = await fetch("/api/list", {
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
        return;

    // Parse des données et affichage

}

Load();
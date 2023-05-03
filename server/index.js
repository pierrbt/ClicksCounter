/*
 * Serveur de l'application de compteur de CPS
 * Auteur : Pierre BIDET
 * Date : 2023_05_03
 * Version : 1.0.0
 * Langage : NodeJS
 * Framework : Express
 * Licence : CC BY-NC-SA 4.0
 */

const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = 5000

// Connexion à la base de données SQLite3
const db = new sqlite3.Database('./db.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

// Création de la table si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS tries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cps DECIMAL,
        user VARCHAR(200),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur de l\'application de compteur de CPS !')
})

// Route pour la liste des essais
app.get('/list', (req, res) => {
    const order = req.query.order || "date";

    // Protection contre les injections SQL en utilisant des paramètres préparés
    db.all(`SELECT * FROM tries ORDER BY ${order} DESC`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(JSON.stringify({error: 'internal server error'}));
            return;
        }
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(rows));
    });
});

// Route pour ajouter un essai
app.get('/add', (req, res) => {
    const score = req.query.score;
    const user = req.query.user;

    if (!score || !user) {
        res.status(400).send(JSON.stringify({error: 'missing parameters'}));
        return;
    }

    // Protection contre les injections SQL en utilisant des paramètres préparés
    db.run(`INSERT INTO tries (cps, user) VALUES (?, ?)`, [score, user], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send(JSON.stringify({error: 'internal server error'}));
            return;
        }
        res.send(JSON.stringify({id: this.lastID}));
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// Fermeture de la connexion à la base de données en cas d'interruption du processus
process.on('SIGINT', () => {
    console.log('Closing database');
    db.close();
    process.exit();
});

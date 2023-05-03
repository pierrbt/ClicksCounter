const express = require('express')

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db.sqlite3');

const app = express()
const port = 5000


// create table if not exists
db.run('CREATE TABLE IF NOT EXISTS tries (id INTEGER PRIMARY KEY AUTOINCREMENT, cps DECIMAL, user VARCHAR(200), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur de l\'application de compteur de CPS !')
})


app.get('/list', (req, res) => {
    let order = req.query.order;
    if (!order) {
        order = "date"
    }
    res.header("Content-Type",'application/json');
    db.all('SELECT * FROM tries ORDER BY ' + order + ' DESC', (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify(rows));
    });
});

app.get('/add', (req, res) => {
    const score = req.query.score;
    const user = req.query.user;

    if (score && user) {
        db.run('INSERT INTO tries (cps, user) VALUES (?, ?)', [score, user], function (err) {
            if (err) {
                throw err;
            }
            res.send(JSON.stringify({id: this.lastID}));
        });
    }
    else {
        res.send(JSON.stringify({error: 'missing parameters'}));
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
    console.log('Closing database')
    db.close();
    process.exit();
});
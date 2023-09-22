// const express = require('express');
import express from 'express';
import knex from 'knex';
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
// const db = require('./db');
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import db from './db.js';


const db2 = knex({
    client: 'sqlite3',
    connection: {
        filename: './database.db'
    }
})
const app = express();
// const db = await dbs()
const port = 3000;
// app.user(cors())

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//app.use(bodyParser.urlencoded({ extended: true }));

//login user
app.post('/login', (req, res) => {

    const { username, password } = req.body;
    if (username && password) {
        if (req.session.authenticated) {
            res.json(req.session)
        } else {
            db.get('SELECT * FROM users where username = ? LIMIT 1', [username], (err, row) => {
                if (err) {
                    res.status(500).send('Internal Server Error')
                } else if (!row) {
                    res.json({ error: 'user not found' });
                } else {
                    if (bcrypt.compareSync(password, row.password, row.salt)) {
                        req.session.authenticated = true
                        req.session.user = row
                        return res.json({ message: 'Authentication succesfull' })
                    } else {
                        return res.json({ error: 'Invalid password' })
                    }
                }
            })
        }
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.send({ loggOut: true })
    })
})

//for check session
app.get('/login', (req, res) => {
    if (req.session.authenticated) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})


//   file_23

//POST user
app.post('/signup', (req, res) => {
    const { username, password, age, name, lastname, email } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt);
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            res.status(500).send({ message: 'Internal Server Error' })
        } else {
            if (row) {
                res.send({ error: 'user already exists' })
            } else {
                db.run('INSERT INTO users (username, password, age, name, lastname, email, salt) values(?,?,?,?,?,?,?)', [username, hashedPassword, age, name, lastname, email, salt], (err) => {
                    if (err) {
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.send({ message: 'Save succesfully' })
                    }
                })
            }
        }
    })
})


// GET all items
app.get('/items', (req, res) => {
    db2.select('*')
        .from('items')
        .then(rows => {
            res.send(rows)
        })
        .catch(error => {
            res.status(500).send('Internal Server Error')
        })

    /*
        db.all('SELECT * FROM items', [], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(rows);
            }
        }); 
    */
});


app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    db2.select('username', 'name', 'lastname','age', 'email')
        .from('users')
        .where('id', id)
        .then(rows => {             
            res.send(rows)
        })
        .catch(err => res.send(err))
})

// app


// GET single item by ID
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else if (!row) {
            res.status(404).send('Item not found');
        } else {
            res.send(row);
        }
    });
});

// POST a new item
app.post('/items', (req, res) => {
    const { name, price, quantity } = req.body;
    if (isNaN(price) || isNaN(quantity)) {
        res.status(500).send('found invalid types')
    } else {
        db.run('INSERT INTO items (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
            } else {
                res.send({ id: this.lastID });
            }
        });

    }
});

// PUT/update an item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    isNaN(price) ? console.log(true) : console.log(false)
    if (isNaN(price) || isNaN(quantity)) {
        res.status(500).send('found invalid types')
    }
    else {
        console.log('trate de actualizar')
        db.run('UPDATE items SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
            } else if (this.changes === 0) {
                res.status(404).send('Item not found');
            } else {
                res.send('Item updated successfully');
            }
        });

    }
});

// DELETE an item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else if (this.changes === 0) {
            res.status(404).send('Item not found');
        } else {
            res.send('Item deleted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});

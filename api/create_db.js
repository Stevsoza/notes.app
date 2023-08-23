// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

const db = new sqlite3.Database('./database.db', err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTable();
        createUserTable();
    }
});

function createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      quantity INT
    )
  `;

    db.run(query, err => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table "items" created successfully.');
            insertTestData();
        }
    });
}

function insertTestData() {
    const query = `
    INSERT INTO items (name, price, quantity)
    VALUES
      ('Zapatos oscuros', 10, 2),
      ('Botella roja', 20, 3),
      ('Camiseta azul', 30, 10)
  `;

    db.run(query, err => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Test data inserted successfully.');
            // db.close();
        }
    });
}

function createUserTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            name TEXT,
            password TEXT, 
            lastname TEXT,
            age INT,
            email TEXT,
            salt TEXT
        )
    `

    db.run(query, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Table "users" created succesfully')
            insertTestUser()
        }
    })
}

function insertTestUser() {
    const password = '123'
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt);

    const query = `
    INSERT INTO users (username, name, password, lastname, age, email, salt)
    VALUES
      ('stevsoza', 'Steven', ?,'Soza', 29, 'sozastev@gmail.com', ?)
  `;

    db.run(query, [hashedPassword, salt], err => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Test data inserted successfully.');
            db.close();
        }
    });
}
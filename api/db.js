// const sqlite3 = require('sqlite3').verbose();
// import { open } from 'sqlite';
import sqlite3 from 'sqlite3'

// Connect to the database
const db = new sqlite3.Database('./database.db', err => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});
// const db = async () => {
//     return open({
//         filename: './database.db',
//         driver: sqlite3.Database
//     })
// }

export default db;
// module.exports = db;
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(
    "./database.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
        return console.error(err.message);
    }
    console.log("Database connected.");
    }
);

db.serialize(function() {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY,
            name TEXT  NOT NULL
        );

        `
    );
    db.run(
        `
        CREATE TABLE IF NOT EXISTS resources (
            id   INTEGER PRIMARY KEY,
            name TEXT    NOT NULL
        );
        `
    );

});

export default async function handler(req, res) {

    // Temp
    const rows = await db.all('SELECT * FROM categories');

    res.status(200).json(rows);
}

db.close()
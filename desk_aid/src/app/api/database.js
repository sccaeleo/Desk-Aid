import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(
    "./database.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
        return console.error(err.message);
    }
    else{
        console.log("Database connected.");
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE,
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });
    }
});

function insertData(){
    //db.run(sqlite3,params,callback)
}


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
    db.run(
        `
        CREATE TABLE IF NOT EXISTS guides (
            id INTEGER PRIMARY KEY,
            name TEXT  NOT NULL
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
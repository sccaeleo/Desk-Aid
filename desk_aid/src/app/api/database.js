import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(
    "./database.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,

    // Check if error
    (err) => {
        if (err) {
        return console.error(err.message);
    }

    // Otherwise run database
    else{
        console.log("Database connected.");

        // Create tables (if they don't already exist)
        db.run(
            `
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT  NOT NULL UNIQUE
            );
    
            `
        );
        db.run(
            `
            CREATE TABLE IF NOT EXISTS resources (
                id   INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
            `
        );
        db.run(
            `
            CREATE TABLE IF NOT EXISTS guides (
                id   INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
            `
        );

        
    }
    
    }
);

export default db
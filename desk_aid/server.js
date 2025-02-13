import sqlite3 from "sqlite3";

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

const execute = async (db, sql) => {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
        if (err) reject(err);
        resolve();
        });
    });
};

db.close()
import express from 'express';

const app = express();
const port = 4000;

import db from "./database.js"

// Start server
app.listen(port, () => {
    console.log("Server running.")
});

// Check server
app.get("/", (req, res, next) => {
    res.json({"message":"The server is up and running!"})
});

// Get resources
app.get("/api/resources", (req, res, next) => {
    var sql = "select * from resources"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// Create resource

// Update resource

// Delete resource

// Get categories
app.get("/api/categories", (req, res, next) => {
    var sql = "select * from categories"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// Create category


// Update category

// Delete category
app.delete("/api/categories/:id", (req, res, next) => {
    db.run(
        'DELETE FROM categories WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted"})
    });
});

// Get guides
app.get("/api/guides", (req, res, next) => {
    var sql = "select * from guides"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});
// Create guide
db.run('INSERT INTO guides(name) VALUES(?)',['Cool Guide'],function (err) {if(err) { return console.log(err.message); }console.log('Row was added to the table: ${this.lastID}');})
// Update guide

// Delete guide

// 404 Error on any other request
app.use(function(req, res){
    res.status(404);
});





import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 4000;

import db from "./database.js"



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
        res.json(rows)
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
//Search guides
function searchGuides(guideName){
app.get("/api/guides", (req, res, next) => {
    var sql = "select " + guideName + " from guides"
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
}

// Create guide
function insertGuide(name){
    db.run('INSERT INTO guides(name) VALUES(?)',[name],function (err) {if(err) { return console.log(err.message); }console.log('Row was added to the table: ${this.lastID}');})
    }

// Update guide

// Delete guide
db.run('DELETE FROM guides WHERE ID = ?',['3'], function (err) {if(err) { return console.log(err.message); }console.log('THINGS WENT HORRIBLY RIGHT');})
app.delete("/api/guides/:id", (req, res, next) => {
    db.run(
        'DELETE FROM guides WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted"})
    });
});

// 404 Error on any other request
app.use(function(req, res){
    res.status(404);
});

// Start server
app.listen(port, () => {
    console.log("Server running.")
});





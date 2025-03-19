import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())
const port = 4000;

import db from "./database.js"



// Check server
app.get("/", (req, res, next) => {
    res.json({"message":"The server is up and running!"})
});

// Sign in
app.post("/api/signin", (req, res, next) => {
    console.log("Received request to /api/signin");
    const { username, password } = req.body;
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    const params = [username, password];
    db.get(sql, params, (err, row) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    if (!row) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
    }
    res.json({ success: true });
    });
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
        res.json(rows)
    });
});

// Create resource
app.post("/api/resources", (req, res, next) => {
    const { name, description } = req.body;
    const sql = "INSERT INTO resources (name, description) VALUES (?, ?)";
    const params = [name, description];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            console.error(err.message);
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Update resource
app.put("/api/resources/:id", (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = "UPDATE resources SET name = ?, description = ? WHERE id = ?";
    const params = [name, description, id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Delete resource
app.delete("/api/resources/:id", (req, res, next) => {
    const { id } = req.params;
    const sql = "DELETE FROM resources WHERE id = ?";
    const params = [id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

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
app.post("/api/categories", (req, res, next) => {
    const { name } = req.body;
    const sql = "INSERT INTO categories (name) VALUES (?)";
    const params = [name];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            console.error(err.message);
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Update category
app.put("/api/categories/:id", (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    const { name } = req.body;
    const sql = "UPDATE categories SET name = ? WHERE id = ?";
    const params = [name, id];
    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: "Category updated successfully" });
    });
});

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
        res.json(rows)
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
app.post("/api/guides", (req, res, next) => {
    const { name } = req.body;
    const sql = "INSERT INTO guides (name) VALUES (?)";
    const params = [name];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});


// Update guide
app.put("/api/guides/:id", (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    const { name } = req.body;
    const sql = "UPDATE guides SET name = ? WHERE id = ?";
    const params = [name, id];
    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: "Guide updated successfully" });
    });
});

// Delete guide
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

// Get category_guides

// Add category_guides link

// Delete category_guides link

// Start server
app.listen(port, () => {
    console.log("Server running.")
});





import express from 'express';
import cors from 'cors';
import expressSession from 'express-session';
import db from "./database.js"

// Set up session to store cookies
const session = {
    secret: 'cookies for breakfast',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json())
app.use(expressSession(session));

// Check server
app.get("/", (req, res, next) => {
    res.json({"message":"The server is up and running!"})
});

// Check if user is signed in
function isAuthenticated (req, res, next) {
    if (req.session.user) {
        next();
    } 
    else {
        res.status(401).json({ error: 'You must be signed in to access this page' });
    }
}

app.get('/api/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'You are signed in!' });
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
    if (row) {
        req.session.user = row;
        res.json({ success: true });
    }
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
        res.status(200).json(rows)
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
        res.status(200).json({ id: this.lastID });
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
        res.status(200).json({ message: "Success" });
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
        res.status(200).json({ id: this.lastID });
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
        res.status(200).json(rows)
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
        res.status(200).json({ id: this.lastID });
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
        res.status(200).json({ message: "Success" });
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
            res.status(200).json({ id: this.lastID })
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

// Get one guide
app.get("/api/guides/:id", (req, res, next) => {
    console.log("Single guide requested: " + req.params.id);
    var sql = "select * from guides where id = ?"
    const { id } = req.params;
    var params = [id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows[0])
        console.log(rows[0])
    });
});

//Search guides
app.get("/api/guides", (req, res, next) => {
    const { search } = req.params;
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

// Get all the steps for a guide
app.get("/api/steps/:id", (req, res, next) => {
    console.log("Steps requested for guide " + req.params.id);
    const { id } = req.params;
    var sql = "select * from steps where guideID = ?"
    var params = [id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows)
        console.log(rows)
    });
})

// Add a step

app.post("/api/steps", (req, res, next) => {
    const { name, description, guideID, parentStepID } = req.body;
    const sql = "INSERT INTO steps (name, description, guideID, parentStepID) VALUES (?, ?, ?, ?)";
    const params = [name, description, guideID, parentStepID];
    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ id: this.lastID });
        console.log("Step added: " + this.lastID);
    });
    db.run(
        'INSERT INTO step_link (parent_step_ID, child_step_ID, guideID) VALUES (?, ?, ?)',
        [parentStepID, this.lastID, guideID],
        function (err) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
        }
    )
})

// Edit a step
app.put("/api/steps/:id", (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = "UPDATE steps SET name = ?, description = ? WHERE id = ?";
    const params = [name, description, id];
    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        console.log("Step updated: " + id);
    })
})

// Delete a step & its links, should only be used for end steps right now.
app.delete("/api/steps/:id", (req, res, next) => {
    db.run(
        'DELETE FROM steps WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            console.log("Step deleted: " + req.params.id);
        }
    )
    db.run(
        'DELETE * FROM step_link WHERE current_step_ID = ? OR child_step_ID = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            console.log("Step link deleted: " + req.params.id);
        }
    )
})

// Get the step links for a guide
app.get("/api/stepLinks/:id", (req, res, next) => {
    console.log("Step links requested for guide " + req.params.id);
    const { id } = req.params;
    var sql = "select * from step_link where guideID = ?"
    var params = [id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows)
        console.log(rows)
    })
    
})

//////////////////////////////////////////////
//Get categories_tables
app.get("/api/categories_tables", (req, res, next) => {
    var sql = "select * from categories_tables"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows)
    });
});

// Create categories_table
app.post("/api/categories_tables", (req, res, next) => {
    const { categoryID,guideID } = req.body; //makes a variable named categoryID
    const sql = "INSERT INTO categories_tables (categoryID, guideID) VALUES (?, ?)";
    const params = [categoryID,guideID]; //sets categoryID to param
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            console.error(err.message);
            return;
        }
        res.status(200).json({ id: this.lastID });
    });
});


// Delete category
app.delete("/api/categories_tables/:id", (req, res, next) => {
    db.run(
        'DELETE FROM categories_tables WHERE categoryID = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.status(200)
    });
});

////////////////////////////////////////////

// Start server
app.listen(port, () => {
    console.log("Server running.")
});

export default app;




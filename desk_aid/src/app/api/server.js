import express from 'express';

const app = express();
const port = 4000;

// Start server
app.listen(port, () => {
    console.log("Server running.")
});

// Check server
app.get("/", (req, res, next) => {
    res.json({"message":"The server is up and running!"})
});

// 404 Error on any other request
app.use(function(req, res){
    res.status(404);
});
const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.status(200).send("Hey muy buenas a todos");
});

app.listen(3000, () => {
    console.log("Server up and running.");
});
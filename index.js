const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.status(200).send("Hey muy buenas a todos!");
});

app.get("/:nombre", (req, res, next) =>{
    console.log(req.params.name);
    res.status(200);
    res.send("Estas en la pagina 'nombre'");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running...");
});
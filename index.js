const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.status(200).send("Bienvenido al Pokedex");
});

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body.name);

});

app.get('/pokemon', (req, res) => {
    res.status(200).send(pokemon);
});

app.get(/^\/pokemon\/([0-9]{1,3})$/, (req, res) => {
    const id = parseInt(req.params[0]);

    if (id >= 1 && id <= 151) {
        res.status(200).send(pokemon[id - 1]);
    } else {
        res.status(404).send("Poke no encontrado");
    }
});

app.get(/^\/pokemon\/([A-Za-z]+)$/, (req, res) => {
    const name = req.params[0];
    const pk = pokemon.filter((p) => {      
          
       return (p.name.toUpperCase() == name.toUpperCase() ) &&  p;
        
    });

(pk.length > 0)  ? 
res.status(200).send(pk) :
res.status(404).send("Pokimon no encontrado");
     
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running...");
});
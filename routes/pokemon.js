const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience) {
    let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
    query +=  `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    const rows = await db.query(query); 
    
    if(rows.affectedRows == 1) {
return res.status(201).json({ code: 201, message: "Pokemon creado exitosamente"});
    }
 return res.status(500).json({ code: 500, message: "Error al crear el Pokemon" });
    }
return res.status(500),express.json({ code: 500, message: "Faltan datos para crear el Pokemon" });
});

pokemon.delete(/^\/\/([0-9]{1,3})$/, async (req, res, next) => {
const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;

const rows = await db.query(query);

if (rows.affectedRows == 1) {
    return res.status(200).json({ code: 200, message: "Pokemon eliminado exitosamente" });
}
return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });

});

pokemon.put(/^\/\/([0-9]{1,3})$/, async (req, res, next) => {
const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

     if(pok_name && pok_height && pok_weight && pok_base_experience) {
    let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height}, `;
    query += `pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id}`;
    const rows = await db.query(query); 
    
    if(rows.affectedRows == 1) {
return res.status(200).json({ code: 200, message: "Pokemon actualizado exitosamente"});
    }
 return res.status(500).json({ code: 500, message: "Error al crear el Pokemon" });
    }
return res.status(500),express.json({ code: 500, message: "Faltan datos para crear el Pokemon" });

});

pokemon.patch(/^\/\/([0-9]{1,3})$/, async (req, res, next) => {
if(req.body.pok_name) {
    let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}',WHERE pok_id=${req.params.id}`;    
    const rows = await db.query(query); 
    
    if(rows.affectedRows == 1) {
return res.status(200).json({ code: 200, message: "Pokemon actualizado exitosamente"});
    }
    
return res.status(500).json({ code: 500, message: "Error al actualizar el Pokemon" });
}
return res.status(500),express.json({ code: 500, message: "Faltan datos para actualizar el Pokemon" });
});

pokemon.get('/',async (req, res, next) => {
  const pkmn = await db.query('SELECT * FROM pokemon');
    res.status(200).json({ code: 1, message: pkmn });
});

pokemon.get(/^\/\/([0-9]{1,3})$/, async (req, res, next) => {
    const id = req.params.id -1;
    if (id >= 1 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = "+id+";");
       return res.status(200).json({ code: 200, message: pkmn });
    }  
       return res.status(404).send({ code: 404, message: "Pokimon no encontrado" });
});

pokemon.get(/^\/\/([A-Za-z]+)$/, async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name+"';");
   
(pkmn.length > 0)  ? 
res.status(200).json({ code: 200, message: pkmn }) :res.status(404).send({ code: 404, message: "Pokimon no encontrado" });
});

module.exports = pokemon;
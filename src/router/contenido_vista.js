const express = require("express");
const router = express.Router();
const vista_tipo_json = require('../models/vista_tipo_json')
const BBDD = require("../conection/conection")
const { Sequelize, QueryTypes } = require('sequelize');

//categorias (servirá información de todas las categorías existentes)
router.get("/categoria", async (req, res) => {
    try {
        const consulta = "SELECT * FROM vista_tipo_json ORDER BY id_categoria "

        const categorias = await BBDD.query(consulta)

        res.status(200).send(categorias[0])
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al procesar la consulta' });
    }

});

//catalogo (servirá el catálogo completo ‘la vista SQL’)
router.get("/", async (req, res) => {
    try {
        const consulta = "SELECT *, CONCAT('http://127.0.0.1:3005/public', poster) AS poster FROM vista_tipo_json"

        const catalogo = await BBDD.query(consulta)

        res.status(200).send(catalogo[0])
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al procesar la consulta' });
    }
});

//catalogo/:id (filtrar por código de la película/serie)

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {

        if (!id) {
            return res.status(400).send({ message: 'El ID no puede ser nulo' });
        }

        const consulta = ` SELECT *, CONCAT('http://127.0.0.1:3005/public', poster) AS poster FROM vista_tipo_json WHERE id = :id`;

        const busqueda_ID = await BBDD.query(consulta, {
            replacements: { id },
            type: Sequelize.QueryTypes.SELECT
        });
        if (busqueda_ID.length > 0) {
            res.status(200).send(busqueda_ID);
        } else {
            res.status(404).send({ message: 'No se encontraron resultados para este ID' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al procesar la consulta' });
    }
});

//catalogo/genero/:genero (filtrar por género del contenido)
router.get("/genero/:genero", async (req, res) => {
    const genero = req.params.genero;
    try {
        const consulta = 'SELECT *, CONCAT ("http://127.0.0.1:3005/public", poster) AS poster FROM vista_tipo_json WHERE genero LIKE :genero'

        const X_Genero = await BBDD.query(consulta, {
            replacements: { genero: `%${genero}%` },
            type: Sequelize.QueryTypes.SELECT
        });

        if (X_Genero.length > 0) {
            res.status(200).send(X_Genero);
        } else {
            res.status(404).send({ message: "No se encuentran resultados" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al procesar la consulta' });
    }
})

// /categoria/:categoria (filtrar por serie - película o cualquier otra categoría que pueda existir)
router.get("/categoria/:categoria", async (req, res) => {
    const categoria = req.params.categoria;

    try {
        if (!categoria) {
            return res.status(400).send({ message: 'La categoria ingresada no puede ser nula' });
        }
        const consulta = `SELECT *, CONCAT ("http://127.0.0.1:3005/public", poster) AS poster FROM vista_tipo_json 
    WHERE categoria IN (
      SELECT categoria_nombre FROM Categorias WHERE categoria_nombre = :categoria )`
        const results = await BBDD.query(consulta, {
            replacements: { categoria },
            type: QueryTypes.SELECT
        });
        if (results.length > 0)
            res.status(200).send(results);
        else {
            res.status(400).send({ message: "No se encuentran resuldatos" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al procesar la consulta' });
    }
});


  module.exports = router
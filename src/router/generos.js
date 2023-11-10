const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const Genero = require('../models/generos');
const Generos = require('../models/generos');
//const [, GenerosContenido] = require('../models/union-models');


// Obtener todos los generos
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.findAll();

        if (!generos.length) {
            res.status(404).json({ message: "No hay géneros disponibles." });
            return;
        }
        res.status(200).json(generos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Se produjo un error al encontrar géneros.' });
    }
});


// Buscar géneros por nombre
router.get('/:genero', async (req, res) => {
    const { genero } = req.params;

    if (genero.trim() === '') {
        res.status(400).json({ message: 'El género debe tener al menos 1 carácter. Inténtalo de nuevo.' });
        return;
    }

    try {
        const generos = await Generos.findAll(
            {
                where: {
                    generos_nombre: {
                        [Op.like]: `%${genero}%`
                    }
                }
            }
        );
        if (!generos.length) {
            res.status(404).json({ message: "No se encontraron géneros que coincidan con la búsqueda." });
            return;
        }
        res.status(200).json(generos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Se produjo un error al encontrar géneros.' });
    }
});

module.exports = router

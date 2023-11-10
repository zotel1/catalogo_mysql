const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Categoria = require('../models/categoria');
const Contenido = require('../models/contenido');

// Obtener todas las categorias
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        if (!categorias.length) {
            res.status(404).json({ message: "No hay ninguna categoría registrada." });
            return;
        }
        res.status(200).json(categorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Se ha producido un error al encontrar categorías.' });
    }
});



module.exports = router;

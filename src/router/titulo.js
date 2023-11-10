const express = require("express");
const router = express.Router()
// Importa el modelo de Titulo si aún no lo has hecho
const Titulos = require('../models/titulo');

// Ruta para obtener todos los títulos
router.get("/", async (req, res) => {
    try {
        // Busca todos los títulos en la base de datos
        const titulos = await Titulos.findAll();
        // Si no se encontraron títulos, responde con un mensaje
        if (!titulos || titulos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron títulos.' });
        }

        // Si se encontraron títulos, envía una respuesta con todos los títulos
        res.status(200).json(titulos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se ha producido un error al obtener los títulos.' });
    }
});


// Ruta para obtener un título por su ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Busca el título por su ID en la base de datos
        const titulo = await Titulos.findByPk(id);

        // Si no se encontró el título, responde con un mensaje
        if (!titulo) {
            return res.status(404).json({ message: 'El título no fue encontrado.' });
        }

        // Si se encontró el título, envía una respuesta con el título
        res.status(200).json(titulo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se ha producido un error al obtener el título.' });
    }
});


module.exports = router;

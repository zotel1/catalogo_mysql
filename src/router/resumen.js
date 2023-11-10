const express = require("express");
const router = express.Router();
// Importa el modelo de Resumen si aún no lo has hecho
const Resumen = require('../models/resumen');

// Ruta para obtener todos los resúmenes
router.get("/", async (req, res) => {
    try {
        // Busca todos los resúmenes en la base de datos
        const resumenes = await Resumen.findAll();

        // Si no se encontraron resúmenes, responde con un mensaje
        if (!resumenes || resumenes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron resúmenes.' });
        }

        // Si se encontraron resúmenes, envía una respuesta con todos los resúmenes
        res.status(200).json(resumenes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se ha producido un error al obtener los resúmenes.' });
    }
});
// Ruta para obtener un resumen por su ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Busca el resumen por su ID en la base de datos
        const resumen = await Resumen.findByPk(id);

        if (!resumen) {
            return res.status(404).json({ message: 'El resumen no fue encontrado.' });
        }

        // Si se encontró el resumen, envía una respuesta con el resumen
        res.status(200).json(resumen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se ha producido un error al encontrar el resumen.' });
    }
});


module.exports = router

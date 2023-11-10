const express = require('express')
const router = express.Router()

const { Op } = require('sequelize')
const Actores = require('../models/actores')


// Obtener todos los actores
router.get('/', async(req, res) => {
    try {
        const reparto = await Actores.findAll()
        if (!reparto.length) {
            res.status(404).json({ message: "No hay actores registrados."})
            return
        }
        res.status(200).json(reparto)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Se produjo un error al encontrar actores.'})
    }
})

// Buscar actores por nombre
router.get('/:nombre', async (req, res) => {
    const { nombre } = req.params
    if (nombre.trim() === '') {
        res.status(400).json({ message: 'El nombre debe tener al menos 1 caracter. Por favor intentelo de nuevo.'})
        return
    }
    try {
        const reparto = await Actores.findAll(
            {
                where: {
                    actores_nombre: {
                        [Op.like]: `%${nombre}%`
                    }
                }
            }
        )
        if (!reparto.length) {
            res.status(404).json({ message: "No hay actores registrados."})
            return
        }
        res.status(200).json(reparto)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Se produjo un error al encontrar actores.'})
    }
    })



module.exports = router
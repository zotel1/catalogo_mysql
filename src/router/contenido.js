/*const express = require("express")
const router = express.Router()

const sequelize = require('../conection/conection')
const { QueryTypes, Op } = require('sequelize')

const Actores = require('../models/actores')
const Catalogo = require('../models/contenido')
const Categoria = require('../models/categoria')
const Generos = require('../models/generos')
//const Resumen = require('../models/resumen')
//const Titulo = require('../models/titulo')




// Obtengo el catalogo completo
router.get("/", async (req, res, next) => {
    try {
        const catalogo = await sequelize.query('SELECT * FROM catalogo', { type: QueryTypes.SELECT })
        if (!catalogo.length) {
            res.status(404).send({message: 'El catálogo está vacio.' })
            return
        }
        res.status(200).send(catalogo)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Se ha producio un error al encontrar el catálogo.'})
        //next(err)
    }
})

// Obtengo un catalogo por su ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params

    //if (Number(isNaN(Number(id)))) {
    if (Number(isNaN(Number(id)))) {
        res.status(400).send({ message: "El id es invalido. Por favor intentelo de nuevo." })
        return
    }

    try {
        const catalogo = await Catalogo.findByPk(Number(id),
        {
            attributes: { exclude: ['idCategoria'] },
            incluide: [
                {
                    model: Categoria,
                    as: 'categoria'
                },
                {
                    model: Generos,
                    as: 'generos',
                    through: { attributes: [] } //Evita que se incluyan atributos adicionales
                },
                {
                    model: Actores,
                    as: 'reparto',
                    through: { attributes: [] } // Evita que se incluyan atributos adicionales
                }
            ]
        }
        )
if (!catalogo.length) {
    res.status(404).send({ message: 'El catalogo esta vacio.' })
    return
}
    res.status(200).send(catalogo)
} catch (error) {
    console.log(error)
        res.status(500).send({ message: 'Se ha producido un error al encontrar el catálogo.'})
}
})

// Obtengo catalogos por filtro de nombre
router.get('/nombre/:nombre', async (req, res) => {
    const { nombre } = req.params

    if (nombre.trim() === '') {
        res.status(400).send({ message: 'El nombre debe tener al menos 1 carácter. Por favor intentelo de nuevo.'})
        return
    }

    try {
        const catalogo = await Catalogo.findAll(
            {
                attributes: { exclude: ['idCategoria'] },
                where: {
                    titulo: {
                        [Op.like]: `%${nombre}%`
                    }
                },
                incluide: [
                    {
                        model: Categoria,
                        as: 'categoria'
                    },
                    {
                        model: Actores,
                        as: 'reparto',
                        through: { attributes: [] } // Evita que se incluyan atributos adicionales
                    }
                ]
            }
        )
        if (!catalogo.length) {
            res.status(404).send({ message: 'El catálogo esta vacío.' })
            return
        }res.status(200).send(catalogo)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Se ha producido un error al encontrar el catálogo.' })
    }
})

// Obtengo catalogos por filtro de genero
router.get('/genero/:genero', async (req, res) => {
    const { genero } = req.params
    if (genero.trim() === '') {
        res.status(400).send({ message: 'El genero debe tener al menos 1 caracter. Por favor intente de nuevo.' })
        return
    }
    try {
        const catalogo = await Catalogo.findAll(
            {
                attributes: ['ID'],
                incluide: [
                    {
                        model: Generos,
                        as: 'generos',
                        where: {
                            nombre: {
                                [Op.like]: `%${genero}%`
                            }
                        },
                        attributes: [],
                        through: {attributes: [] } // Evita que se incluyan atributos adicionales
                    }
                ]
            }
        )

        const catalogoFull = await Catalogo.findAll(
            {
                attributes: { exclude: ['idCategoria'] },
                where: {
                    ID: {
                        [Op.in]: catalogo.map(e => e.ID)
                    }
                },
                include: [
                    {
                    model: Categoria,
                    as: 'categoria'
                    },
                    {
                        model: Generos,
                        as: 'generos',
                        through: { attributes: [] } // Evita qye se incluyan atributos adicionales
                    },
                    {
                        model: Actores,
                        as: 'reparto',
                        through: { attributes: [] } // Evita que se incluyan atributos adicionales
                    }
                ]
            }
        )
        if (!catalogoFull.length) {
            res.status(404).send({ message: 'El catálogo esta vacio.'})
            return
        }res.status(200).send(catalogo)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Se ha producido un error al encontrar el catálogo.'})
    }
    })



// Obtengo catalogos por filtro de categoria
router.get('/categoria/:categoria', async (req, res) => {
    const { categoria } = req.params;

    if (categoria.trim() === '') {
        res.status(400).send({ message: 'The category must have least 1 character. Please try again.' });
        return;
    }

    try {
        const catalogo = await Contenido.findAll(
            {
                attributes: { exclude: ['idCategoria'] },
                include: [
                    {
                        model: Categoria,
                        as: 'categoria',
                        where: {
                            nombre: {
                                [Op.like]: `%${categoria}%`
                            }
                        }
                    },
                    {
                        model: Generos,
                        as: 'generos',
                        through: { attributes: [] } // Evita que se incluyan atributos adicionales
                    },
                    {
                        model: Actores,
                        as: 'reparto',
                        through: { attributes: [] } // Evita que se incluyan atributos adicionales
                    }
                ]
            }
        );

        if (!catalogo.length) {
            res.status(404).send({ message: 'The catalog is empty with the category passed.' });
            return;
        } res.status(200).send(catalogo)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error was ocurred to find the catalog.' });
    }
})

/*


router.post("/", async (req, res) => {
    const { Titulo, Resumen, Temporadas } = req.body
    if (!Titulo) {
        return res.status(403).send({ message: "Debes ingresar un titulo." })
    }
    if (!Resumen) {
        return res.status(403).send({ message: "Debes ingresar un resumen." })
    }
    if (!Temporadas) {
        return res.status(403).send({ message: "Debes ingresar una temporada." })
    }
    try {
        const newCatalogo = await Catalogo.create({ Titulo, Resumen, Temporadas })
        res.status(201).send(newCatalogo)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.put("/:catalogo_id", async (req, res) => {
    await Catalogo.update(req.body, { where: { ID: req.params.catalogo_id } })
    const catalogo = await Catalogo.findByPk(req.params.catalogo_id)
    res.status(200).send(catalogo)
})

router.delete("/:catalogo_id", async (req, res) => {
    await Catalogo.destroy({ where: { ID: Number(req.params.catalogo_id) } })
    res.status(200).send({ message: `El producto de id: ${req.params.catalogo_id} fue eliminado con éxito.` })
}) 

module.exports = router

*/
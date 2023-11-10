const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const sequelize = require('./conection/conection')
const routCatalogo = require("./router/contenido_vista")
const routCategoria = require("./router/categoria")
const routGeneros = require("./router/generos")
const routActores = require("./router/actores")
const routResumen = require("./router/resumen")
const routTitulo = require("./router/titulo")


const BBDD = require("./conection/conection")

// Middleware para JSON
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

/*app.get('/', (req, res) => {
    res.send(htmlContent)
}) */

app.use('/catalogo', routCatalogo)

app.use('/categoria', routCategoria)

app.use('/generos', routGeneros)

app.use('/actores', routActores)

app.use('/resumen', routResumen)

app.use('/titulos', routTitulo)

//app.use('/catalogo-actores', catalogo_act_Rout)

//app.use('/catalogo-generos', catalogo_gen_Rout)

// Control de rutas inexistentes
app.use('*', (req, res) => {
    res.status(404).send({ error: `La URL indicada no existe en este servidor` })
})







// Middleware que controla los errores
app.use((err, req, res, next) => {
    console.log(err)
    res.send(err) 
}) 


// Método oyente de solicitudes
BBDD.authenticate().then(() => {
        app.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}/catalogo`);
        });
    }).catch(() => {
        console.log("Hubo un problema con la sincronización con la base de datos.")
    })
.catch(() => {
    console.log("Hubo un problema con la conección a la base de datos.")
});

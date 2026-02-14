const express = require("express");
const router = express.Router();
const fs = require('fs')

const script = require("../../script")
const docentes = require("../controller/docentes")


router.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

// ENDPOINTS DOCENTE //

router.post("/crearDocente", _u_try.try(async (req, res) => {
    console.log('/crearDocente')
    return await docentes.crearDocente(req.body)
}))

router.post("/buscarDocente", _u_try.try(async (req, res) => {
    console.log('/buscarDocente')
    return await docentes.buscarDocente(req.body)
}))

router.post("/crearGrado", _u_try.try(async (req, res) => {
    console.log('/crearGrado')
    // --- Insertar datos en la base de datos --- //
    const insert = await script.insertarDatos()

    // return insert
    return 'insert'

}))


module.exports = router;
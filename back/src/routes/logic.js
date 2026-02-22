const express = require("express");
const router = express.Router();
const fs = require('fs')

const script = require("../../script")
const docentes = require("../controller/docentes")
const estudiantes = require("../controller/alumnos")
const grados = require("../controller/grados")
const asistencia = require("../controller/asistencia")


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

// ENDPOINTS ALUMNOS //

router.post("/crearAlumno", _u_try.try(async (req, res) => {
    console.log('/crearAlumno')
    return await estudiantes.crearAlumno(req.body)
}))

router.post("/buscarAlumno", _u_try.try(async (req, res) => {
    console.log('/buscarAlumno')
    return await estudiantes.buscarAlumno(req.body)
}))
router.post("/alumnoXgrado", _u_try.try(async (req, res) => {
    console.log('/alumnoXgrado')
    return await estudiantes.buscarAlumnosGrado(req.body)
}))

// ENDPOINTS GRADOS //

router.post("/crearGrado", _u_try.try(async (req, res) => {
    console.log('/crearGrado')
    return await grados.crearGrado(req.body)
}))

router.post("/buscarGrado", _u_try.try(async (req, res) => {
    console.log('/buscarGrado')
    return await grados.buscarGrado(req.body)
}))

// ENDPOINTS ASISTENCIA //

router.post("/crearAsistencia", _u_try.try(async (req, res) => {
    console.log('/crearAsistencia')
    return await asistencia.crearAsistencia(req.body)
}))

router.post("/buscarAsistencia", _u_try.try(async (req, res) => {
    console.log('/buscarAsistencia')
    return await asistencia.consultaruscarAsistenciaGrado(req.body)
}))

router.post("/asistenciaAlumno", _u_try.try(async (req, res) => {
    console.log('/asistenciaAlumno')
    return await asistencia.consultaruscarAsistenciaAlumno(req.body)
}))

// ENDPOINTS NOTAS //

router.post("/crearNotas", _u_try.try(async (req, res) => {
    console.log('/crearAsistencia')
    return await asistencia.crearAsistencia(req.body)
}))

router.post("/buscarNotas", _u_try.try(async (req, res) => {
    console.log('/buscarAsistencia')
    return await asistencia.consultaruscarAsistenciaGrado(req.body)
}))

router.post("/notasAlumno", _u_try.try(async (req, res) => {
    console.log('/asistenciaAlumno')
    return await asistencia.consultaruscarAsistenciaAlumno(req.body)
}))
module.exports = router;
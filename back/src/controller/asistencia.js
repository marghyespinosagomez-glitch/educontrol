const crypto = require('crypto');
const fs = require('fs')

const crearAsistencia = async (data) => {
    const asistencia = {
        uuid: crypto.randomUUID(),
        grado_uuid: data.grado_id,
        docente_uuid: data.docente_id,
        materia_nombre: data.materia,
        fecha: data.fecha,
        bloque: data.dia,
        fecha_registro: new Date()
    }

    const buscarGrado = await __Db.obtenerLogs({ table: 'grados', datos: { uuid: data.grado_id } })
    console.log('buscarGrado::: ', buscarGrado)
    if (buscarGrado.length == 0) {
        throw Error(`NO_GRADE || ${data.grado_uuid}`)
    }


    const buscarDocente = await __Db.obtenerLogs({ table: 'docentes', datos: { uuid: data.docente_id } })
    console.log('buscarDocente::: ', buscarDocente)
    if (buscarDocente.length == 0) {
        throw Error(`NO_DOCENTE || ${data.docente_id}`)
    }

    const docenteDatos = buscarDocente[0].datos
    const gradosDocentes = validarMaterias(docenteDatos, data)
    console.log('gradosDocentes::: ', gradosDocentes)
    if (!gradosDocentes.success) {
        if (gradosDocentes.message == "NO_MATERIA") {
            throw Error(`${gradosDocentes.message} || ${data.grado_id} || ${data.materia}`)
        }
        throw Error(`${gradosDocentes.message} || ${data.grado_id}`)
    }


    const grado = buscarGrado[0]
    const dia = validarDia(grado, data)
    console.log('dia::: ', dia)
    if (!dia.success) {
        if (dia.message == "NO_MATERIA") {
            throw Error(`${dia.message} || ${data.grado_id} || ${data.materia}`)
        }
        throw Error(`${dia.message} || ${data.grado_id} || ${data.materia} || ${data.dia}`)
    }

    const trueEstudiantes = validarEstudiantes(grado, data)
    console.log('trueEstudiantes::: ', trueEstudiantes)

    const insert = await __Db.insertDatos({ table: 'asistencia_sesiones', datos: asistencia })
    if (!insert) {
        throw Error('NO_INSERT')
    }
    const estudiantesAsistencia = trueEstudiantes.siEstudiantes
    const NoestudiantesAsistencia = trueEstudiantes.noEstudiantes

    for (let index = 0; index < estudiantesAsistencia.length; index++) {
        const element = estudiantesAsistencia[index];
        const asistencia_deta = {
            sesion_uuid: asistencia.uuid,
            alumno_uuid: element.uuid,
            estado: element.estado
        }
        if (element.excusa) {
            const excusas = element.excusa
            const dirImage = "./tmp/asistencias/" + element.uuid + "_" + asistencia.fecha + "." + excusas.ext
            fs.writeFileSync(dirImage, excusas.b64, 'base64', function (err) {
                console.log(err);
            })
            asistencia_deta['ruta_excusa'] = dirImage
        }
        const insert = await __Db.insertDatos({ table: 'asistencia_detalles', datos: asistencia_deta })
        if (!insert) {
            throw Error('NO_INSERT')
        }
    }


    // const alumnos = buscarGrado[0].alumnos
    // alumnos.push(objeto.uuid)
    // const update = await __Db.updateData({ table: 'grados', datos: { uuid: data.grado, alumnos } })
    // return update
}

const validarDia = (grado, data) => {
    const materias = grado.materias
    console.log('materias::: ', materias)
    for (let index = 0; index < materias.length; index++) {
        const element = materias[index];
        if (element.nombre === data.materia) {
            const dias = element.horario.dias
            console.log('dias::: ', dias)
            if (dias.includes(data.dia)) {
                return { success: true }
            }
            return { success: false, message: "NO_DIA" }
        }

    }
    return { success: false, message: "NO_MATERIA" }
}

const validarEstudiantes = (grado, data) => {
    const alumnos = grado.alumnos
    const estudiante = data.estudiante
    const noEstudiantes = []
    const siEstudiantes = []
    for (let index = 0; index < estudiante.length; index++) {
        const element = estudiante[index];
        if (alumnos.includes(element.uuid)) {
            siEstudiantes.push(element)
            continue
        }
        noEstudiantes.push(element)
    }
    return { noEstudiantes, siEstudiantes }
}

const validarMaterias = (grado, data) => {
    for (let index = 0; index < grado.length; index++) {
        const element = grado[index];
        if (element.grados === data.grado_id) {
            const materias = element.materias
            console.log('materias::: ', materias)
            if (materias.includes(data.materia)) {
                return { success: true }
            }
            return { success: false, message: "NO_MATERIA" }
        }

    }
    return { success: false, message: "NO_GRADO" }
}

const buscarAsistencia = async (data) => {
    const buscar = await __Db.searchData({ table: 'asistencia_detalles', datos:data })
    return buscar
}

const buscarAsistencia1 = async (data) => {
    const buscar = await __Db.searchData({ table: 'asistencia_sesiones', datos:data })
    return buscar
}

const consultaruscarAsistenciaGrado = async (data) => {
    const buscar = await __Db.DataAsistenciaGrado(data)
    return buscar
}

const consultaruscarAsistenciaAlumno = async (data) => {
    const buscar = await __Db.DataAsistenciaAlumno(data)
    return buscar
}

module.exports.buscarAsistencia1 = buscarAsistencia1
module.exports.buscarAsistencia = buscarAsistencia
module.exports.consultaruscarAsistenciaGrado = consultaruscarAsistenciaGrado
module.exports.consultaruscarAsistenciaAlumno = consultaruscarAsistenciaAlumno
module.exports.crearAsistencia = crearAsistencia

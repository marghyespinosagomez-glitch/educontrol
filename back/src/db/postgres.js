const { Client } = require('pg')
// var SqlString = require('sqlstring');
let client = null

class db {
    constructor(dataConnection) {
        this.client = new Client(dataConnection)
        // this.client.connect()

    }
    async conect() {
        await this.client.connect()
    }

    async insertDatos(data, callback) {
        try {
            console.log('datos a insertar::: ', data)
            const table = data.table
            const datos = data.datos
            const iniQueryString = `INSERT INTO ${table}`
            let queryArray = []
            let keyQuery = '('
            let dataQuery = ') values ('
            if (table == 'grados') {
                keyQuery = keyQuery + 'uuid,numero,letra,docente_director,alumnos,materias'
                dataQuery = dataQuery + '$1,$2,$3,$4,$5,$6'
                queryArray.push(datos.uuid, datos.number, datos.letter, datos.docDirector, JSON.stringify(datos.alumnos), JSON.stringify(datos.materias))
            }
            if (table == 'materias') {
                keyQuery = keyQuery + 'uuid,nombre_materia,docente,grado'
                dataQuery = dataQuery + '$1,$2,$3,$4'
                queryArray.push(datos.uuid, datos.name, datos.docente, datos.grados)
            }

            if (table == 'docentes') {
                keyQuery = keyQuery + 'uuid,tipo_documento,documento,nombre,email,telefono,direccion,datos'
                dataQuery = dataQuery + '$1,$2,$3,$4,$5,$6,$7,$8'
                queryArray.push(datos.uuid, datos.typeDoc, datos.document, datos.name, datos.email, datos.cell, datos.adress, JSON.stringify(datos.datos))
            }
            if (table == 'alumnos') {
                keyQuery = keyQuery + 'uuid,tipo_documento,documento,nombre,email,telefono,direccion,acudiente_nombre,acudiente_telefono,acudiente_email,acudiente_direccion,grado'
                dataQuery = dataQuery + '$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12'
                queryArray.push(datos.uuid, datos.typeDoc, datos.document, datos.name, datos.email, datos.cell, datos.adress, datos.nameAcudiente, datos.cellAcudiente, datos.emailAcudiente, datos.adressAcudiente, datos.grado)
            }

            if (table == 'asistencia_sesiones') {
                keyQuery = keyQuery + 'uuid,grado_uuid,docente_uuid,materia_nombre,fecha,bloque,fecha_registro'
                dataQuery = dataQuery + '$1,$2,$3,$4,$5,$6,$7'
                queryArray.push(datos.uuid, datos.grado_uuid, datos.docente_uuid, datos.materia_nombre, datos.fecha, datos.bloque, datos.fecha_registro)
            }
            if (table == 'asistencia_detalles') {
                keyQuery = keyQuery + 'sesion_uuid,alumno_uuid,estado'
                dataQuery = dataQuery + '$1,$2,$3'
                queryArray.push(datos.sesion_uuid, datos.alumno_uuid, datos.estado)
                if (datos.ruta_excusa) {
                    keyQuery = keyQuery + ',ruta_excusa'
                    dataQuery = dataQuery + ',$4'
                    queryArray.push(datos.ruta_excusa)
                }
            }

            if (table == 'configuracion_notas') {
                keyQuery = keyQuery + 'uuid,grado_uuid,materia_nombre,docente_uuid,periodo,componente,nombre_actividad,porcentaje_sobre_total'
                dataQuery = dataQuery + '$1,$2,$3,$4,$5,$6,$7,8'
                queryArray.push(datos.uuid, datos.grado_id, datos.materia, datos.docente_uuid, datos.periodo, datos.componente, datos.nombre_actividad, datos.porcentaje_sobre_total)
            }

            if (table == 'notas_estudiantes') {
                keyQuery = keyQuery + 'configuracion_uuid,alumno_uuid,valor_nota,fecha_registro'
                dataQuery = dataQuery + '$1,$2,$3,$4'
                queryArray.push(datos.configuracion_uuid, datos.alumno_uuid, datos.valor_nota, datos.fecha_registro)
            }
            const queryString = iniQueryString + keyQuery + dataQuery + ')'
            console.log('queryString::: ', queryString)
            console.log('queryArray::: ', queryArray)
            var ins = await this.client.query(queryString, queryArray)
            console.log('PASA INSERTAR: ')
            console.log('ins::: ', ins.command)
            return { status: 'ins.command' }
        } catch (e) {
            console.log('ERROR LOGS:: ', e)
            return { status: false }
        }

    }

    async searchData(data, callback) {
        const queryString = `SELECT * FROM ${data.table};`
        var res = await this.client.query(queryString)
        return res.rows
    }

    async DataAsistenciaGrado(data, callback) {
        const queryString = `SELECT 
                            a.uuid,
                            a.nombre AS estudiante,
                            s.fecha,
                            s.bloque,
                            s.materia_nombre,
                            d.estado,
                            d.ruta_excusa
                            FROM asistencia_detalles d
                            JOIN asistencia_sesiones s ON d.sesion_uuid = s.uuid
                            JOIN alumnos a ON d.alumno_uuid = a.uuid
                            WHERE s.grado_uuid = '${data.grado}'
                            AND s.fecha BETWEEN '${data.fechaIni}' AND '${data.fechaFin}'
                            ORDER BY a.uuid, a.nombre, s.fecha, s.bloque;`
        console.log('queryString::: ', queryString)
        var res = await this.client.query(queryString)
        // console.log('res::: ', res)
        return res.rows
    }

    async DataAsistenciaAlumno(data, callback) {
        const queryString = `SELECT 
        s.fecha,
        s.materia_nombre,
        s.bloque,
        d.estado,
        d.ruta_excusa
        FROM asistencia_detalles d
        JOIN asistencia_sesiones s ON d.sesion_uuid = s.uuid
        WHERE d.alumno_uuid = '${data.uuid}'
        AND s.fecha BETWEEN '${data.fechaIni}' AND '${data.fechaFin}'
        ORDER BY s.fecha DESC, s.bloque ASC;`
        console.log('queryString::: ', queryString)
        var res = await this.client.query(queryString)
        // console.log('res::: ', res)
        return res.rows
    }


    async obtenerLogs(data) {
        console.log('obtenerLogs::: ', data)
        const table = data.table
        const datos = data.datos
        var aWhere = []
        var sWhere = ""
        if (datos.uuid && datos.uuid != "")
            aWhere.push("uuid = '" + datos.uuid + "'")


        if (aWhere.length)
            sWhere = aWhere.join(" and ")

        if (data.limite)
            sWhere = sWhere + " LIMIT " + data.limite
        console.log(
            "SELECT " +
            " * " +
            `FROM ${table} ` +
            "WHERE " +
            sWhere +
            ";"
        )
        var resQuery = await this.client.query(
            "SELECT " +
            " * " +
            `FROM ${table} ` +
            "WHERE " +
            sWhere +
            ";"
        )

        // var resQuery = await this.client.query(
        //     "SELECT " +
        //     " * " +
        //     "FROM logs_bematch " +
        //     ";"
        // )
        var respuesta = resQuery.rows
        return respuesta
    }

    async updateData(data) {
        console.log('obtenerLogs::: ', data)
        const table = data.table
        const datos = data.datos
        var aWhere = []
        var sWhere = ""
        // if (datos.uuid)
        //     aWhere.push("uuid = '" + datos.uuid + "'")

        if (table == 'grados' && datos.alumnos)
            aWhere.push("alumnos = " + "'" + JSON.stringify(datos.alumnos) + "'")

        if (data.id && data.id != '')
            aWhere.push("logs_transaccion = '" + data.id + "'")

        if (aWhere.length)
            sWhere = aWhere.join(" and ")

        if (data.limite)
            sWhere = sWhere + " LIMIT " + data.limite
        console.log(
            "UPDATE " + table + " SET " + sWhere + " WHERE " + "uuid = '" + datos.uuid + "';"
        )
        var resQuery = await this.client.query(
            "UPDATE " + table + " SET " + sWhere + " WHERE " + "uuid = '" + datos.uuid + "';"
        )

        var resQuery = await this.client.query("UPDATE " + table + " SET " + sWhere + " WHERE " + "uuid = '" + datos.uuid + "';")
        console.log('resQuery.command::: ', resQuery.command)
        var respuesta = resQuery.rows
        if (resQuery.command != 'UPDATE') {
            return false
        }
        return true
    }

}


module.exports = db
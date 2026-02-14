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
            let queryArray =[datos.uuid]
            let keyQuery = '(uuid'
            let dataQuery = ') values ($1'
            if(table=='grados'){
                keyQuery = keyQuery + ',nombre_grado,estudiantes,materias,docente_director'
                dataQuery = dataQuery + ',$2,$3,$4,$5'
                queryArray.push(datos.name, datos.estudiantes, datos.materias, datos.docente )
            }
            if(table=='materias'){
                keyQuery = keyQuery + ',nombre_materia,docente,grado'
                dataQuery = dataQuery + ',$2,$3,$4'
                queryArray.push(datos.name, datos.docente, datos.grados)
            }

            if(table=='docentes'){
                keyQuery = keyQuery + ',tipo_documento,documento,nombre,email,telefono,direccion,datos'
                dataQuery = dataQuery + ',$2,$3,$4,$5,$6,$7,$8'
                queryArray.push(datos.typeDoc, datos.document, datos.name,datos.email,datos.cell,datos.adress,JSON.stringify(datos.datos))
            }
            const queryString = iniQueryString + keyQuery + dataQuery + ')'
            console.log('queryString::: ', queryString)
            console.log('queryArray::: ', queryArray)
            var ins = await this.client.query(queryString,queryArray)
            console.log('PASA INSERTAR: ')
            console.log('ins::: ', ins.command)
            return { status: ins.command }
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


    
}


module.exports = db
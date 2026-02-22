const Db = require('../db/postgres')

const globals = () => {
    global.__config = require('./config.json')
    global.__Db = new Db(__config.dbPostgres)
    global._u_try = require('../utils/try')
    __Db.conect() // Conectar a la base de datos al iniciar la aplicación
}

module.exports.load = globals;
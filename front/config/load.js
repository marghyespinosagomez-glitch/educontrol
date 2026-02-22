const load = async () => {
    global.__u = require('../utils/utils')
    global.__config = require('./config.json')
}

module.exports.load = load
const express = require('express');
const app = express();
const cors = require('cors');
const load = require('./src/config/load');
const req_data = require('./src/middleware/reqData');

const main = async () => {
    app.use(cors(false));
    app.use(req_data.extracData)
    await load.load()
    const routes_logic = require('./src/routes/logic')

    app.use((req, res) => {
        req.next()
    })
    app.use('/logic', routes_logic)

    app.listen(__config.port, () => {
        console.log('server-back on PORT : ', __config.port)
    })
}
main()
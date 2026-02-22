const express = require('express');
const whiskers = require('whiskers');
const config = require('./config/load');
const routes_views = require('./routes/views');

const main = async () => {
    await config.load();

    // if (process.argv.length != 3) {
    //     console.log("Debe ingresar el puerto")
    //     exit();
    // }

    const app = express();
    

    // const routes_logic = require('./routes/logic');

    // Configuración del motor de plantillas
    app.engine('html', whiskers.__express);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Configuración de middlewares
    app.use(express.json({ limit: '10mb' }));
    app.use('/assets', express.static(__dirname + '/views/assets'));

    // Rutas
    app.use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use('/', routes_views);
    // app.use('/logic', routes_logic);
    // Inicio del servidor
    const PORT = 3000;
    // const PORT = process.argv[2];
    app.listen(PORT, '0.0.0.0',() => {
        console.log(`App Started on PORT ${PORT}`);
    });
};

main();
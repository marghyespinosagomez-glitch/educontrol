const axios = require('axios')
// var msgpack = require("msgpack-lite");

function try_(handler, isMsgPack = false) {
    return async (req, res, next) => {
        try {
            await sendOk(res, req, isMsgPack, await handler(req, res) )
        } catch (e) {

            console.log("Main Error:", e)
            var error = "Error al ejecutar peticion"
            if (e && e.message)
                error = e.message
            //error = buscarEnDiccionario(error)
            res.status(500).send({
                success: false,
                error
            });
        }
    };
}

async function sendOk(res, req,  isMsgPack, data = {}) {
    if (isMsgPack) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(data);
        return;
    }
    data.success = 'success' in data ? data.success : true;
    res.send(data)
}

async function render(res, view, js = true) {
    const assetsJs = './assets/js/'

    const opt = {
        partials: {
            // modal: 'modal.html',
            // footer: 'footer.html',
            // header: 'header.html',
            // menu_bottom: 'menu_bottom.html',
            // sidebar: 'sidebar.html',
            body: view + '.html',
        }
    };

    if (js)
        opt.partials.js = assetsJs + view + '.js'

    res.render('main.html', opt)
}

async function axios_back(opt) {
    const method = opt.method ? opt.method : "POST";
    const sendData = opt.data ? opt.data : null;
    const headers = opt.headers ? opt.headers : {};
    const path = opt.path ? opt.path : '';
    const responseType = opt.responseType ? opt.responseType : '';

    let configAxios = {
        method,
        url: opt.url + path,
        data: sendData,
        headers,
    }

    if (responseType) {
        configAxios.responseType = responseType;
    }

    try {
        const response = await axios(configAxios);
        //console.log('Respuestaaaaaa:', response);
        
        let dataRes = response.data;
        const contentType = response.headers['content-type'];
        if (contentType.includes('application/msgpack') || contentType.includes('application/octet-stream')) {
            // TODO: Implementar decodificación con msgpack
            // dataRes = msgpack.decode(new Uint8Array(response.data));
        }

        return dataRes;

    } catch (error) {
        console.error("Error en la petición:", error.response.data);

        let errMsg = 'Error en la conexión con el servidor';
        if (error.response?.data) {
            return error.response?.data
        }
        return { success: false, error: errMsg }
    }
}

function validUserAgents(userAgentReq) {
    let arrAgents = __data_conf.serv.agentsExcluded;
    for (let index = 0; index < arrAgents.length; index++) {
        const auxAgent = arrAgents[index];
        if (userAgentReq.includes(auxAgent))
            return true;
    }
    return false;
}

module.exports.try = try_
module.exports.render = render
module.exports.axios_back = axios_back
module.exports.validUserAgents = validUserAgents
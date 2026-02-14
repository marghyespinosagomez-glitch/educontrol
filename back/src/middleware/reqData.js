const extracData = async (req, res, next) => {
    const context = req.url.split("?")
    const method = req.method
    console.log('method::: ', method)
    try {
        if (method == 'POST') {
            req.body = await extractData(req)
        }
        next()
    } catch (e) {
        console.log('ERROR_DATA_SEND_  ', e)
        res.send({ succes: false, message: 'ERROR_DATA_SEND' })
    }
}

function extractData(req) {
    return new Promise((ok, fail) => {
        var buff = [];
        req.on("data", (chunk) => {
            buff.push(chunk);
        });
        req.on("end", () => {
            try {
                var bodyConcat = Buffer.concat(buff);
                var bodyConString = bodyConcat.toString()
                var jsonBody = JSON.parse(bodyConString)
                ok(jsonBody);
            } catch (e) {
                fail(e);
            }
        });
    });
}

module.exports.extracData = extracData
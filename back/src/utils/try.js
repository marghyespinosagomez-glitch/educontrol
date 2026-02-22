function _try(handler) {
    return async (req, res) => {
        const context = req.url.split("?")
        try {
            console.log('INGRESA TRY')
            var data = await handler(req, res)
            data = {
                success: true,
                ...data
            }
            res.send(data)
        } catch (e) {
            console.log("Main Error:", e);
            var error = e
            if (e != 'ERROR_SERVER_CONNECTION')
                error = "General";
            if (e && e.message)
                error = e.message;
            var err = {
                success: false,
                error
            }
            res.status(500).send(err)
        }
    };
}
module.exports.try = _try;
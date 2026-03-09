const express = require('express');
const path = require('path');

const app = express();
const PORT = 3070;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.get('/views', (req, res) => {
    res.sendFile(path.join(__dirname, 'ingresar.html', 'main.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
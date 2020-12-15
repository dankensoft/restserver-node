const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('./config/config');
const path = require('path');

const bodyParser = require('body-parser');
const { request } = require('express');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Habilitar la Carpeta Public
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuración Global de Rutas
app.use(require('./routes/index'));

// Conectando a la BD 'cafe' en MongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, resp) => {
    if (err) throw err;

    console.log('BD ONLINE!!');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${ process.env.PORT }`);
})
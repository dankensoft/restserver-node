const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('./config/config');

const bodyParser = require('body-parser');
const { request } = require('express');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Usamos las rutas de Usuario
app.use(require('./routes/usuario'));

// Conectando a la BD 'cafe' en MongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, resp) => {
    if (err) throw err;

    console.log('BD ONLINE!!');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${ process.env.PORT }`);
})
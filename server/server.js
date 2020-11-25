const express = require('express');
const app = express();
require('./config/config');

const bodyParser = require('body-parser');
const { request } = require('express');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.send('get Usuario')
});

app.post('/usuario', function(req, res) {
    // res.send('post Usuario')
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // res.send('put Usuario')
    res.json({
        id
    })
});

app.delete('/usuario', function(req, res) {
    res.send('delete Usuario')
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${ process.env.PORT }`);
})
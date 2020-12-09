const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function(req, res) {
    // res.send('get Usuario')
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            // Error
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            });

        })
});

app.post('/usuario', function(req, res) {
    // res.send('post Usuario')
    let body = req.body;

    // Trabajando con usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // Guardando en la BD
    usuario.save((err, usuarioDB) => {
        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Guarda correctamente
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    /* if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    } */
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // res.send('put Usuario')

    // Recibiendo la información para actualizar y se hace referencia a los campos que si se pueden actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, { runValidators: true }, (err, usuarioDB) => {

        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Actualiza la data
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});

app.delete('/usuario/:id', function(req, res) {
    // res.send('delete Usuario')
    let id = req.params.id;

    // Eliminar usuario de la BD
    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        // Borrada la data
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    }) */

    // Se crea Objeto para modificar el Estado
    let cambiaEstado = {
            estado: false
        }
        // Cambiando Estado del Usuario a False
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (cambiaEstado.estado === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        // Estado modificado a false en la data
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});

module.exports = app;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = express.Router();
var Eventos = require('../functions/consultasEventos');
var Tierra = require('../functions/consultasTierra');

api.get('/eventos/gastototal', Eventos.gastoTotal);
api.get('/eventos/conteoeventos', Eventos.conteoEventos);
api.get('/eventos/gastoeventos', Eventos.gastoEventos);
api.get('/eventos/consulta', Eventos.consulta);

api.get('/tierra/gastototal', Tierra.gastoTotal);
api.get('/tierra/gastocategoria', Tierra.gastoCategoria);
api.get('/tierra/consulta', Tierra.consulta);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.use('/', api);

module.exports = app;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = express.Router();
var Eventos = require('../functions/consultasEventos');
var Tierra = require('../functions/consultasTierra');

api.post('/eventos/gastototal', Eventos.gastoTotal);
api.post('/eventos/gastoSubcategoria', Eventos.gastoSubcategoria);
api.post('/eventos/conteoeventos', Eventos.conteoEventos);
api.post('/eventos/gastoeventos', Eventos.gastoEventos);
api.post('/eventos/consulta', Eventos.consulta);

api.post('/tierra/gastototal', Tierra.gastoTotal);
api.post('/tierra/gastocategoria', Tierra.gastoCategoria);
api.post('/tierra/consulta', Tierra.consulta);

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
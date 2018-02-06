var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = express.Router();
var funciones = require('../functions/consultas');

api.get('/gastoTotal', funciones.gastoTotal);
api.get('/conteoEventos', funciones.conteoEventos);
api.get('/consulta', funciones.consulta);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', api);

module.exports = app;
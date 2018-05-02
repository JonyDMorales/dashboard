var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = express.Router();
var Eventos = require('../functions/consultasEventos');
var Tierra = require('../functions/consultasTierra');
var NuevoEventos = require('../functions/consultasMejoradoEventos');
var NuevoTierra = require('../functions/consultasMejoradasTierra');

api.post('/eventos/crear/candidatos', NuevoEventos.generarInsercionesCandidatos);
api.post('/eventos/crear/presidente', NuevoEventos.generarInsercionesPresidente);
api.post('/eventos/obtener/candidatos', NuevoEventos.obetenerCandidatos);
api.post('/eventos/obtener/presidente', NuevoEventos.obetenerPresidente);

api.post('/tierra/crear/candidatos', NuevoTierra.generarInsercionesCandidatos);
api.post('/tierra/crear/presidente', NuevoTierra.generarInsercionesPresidente);
api.post('/tierra/obtener/candidatos', NuevoTierra.obetenerCandidatos);
api.post('/tierra/obtener/presidente', NuevoTierra.obetenerPresidente);

api.post('/eventos/gastototal', Eventos.gastoTotal);
api.post('/eventos/estadoseventos', Eventos.estadosEventos);
api.post('/eventos/estadosmunicipios', Eventos.estadosMunicipios);
api.post('/eventos/gastosubcategoria', Eventos.gastoSubcategorias);
api.post('/eventos/consulta', Eventos.consulta);

api.post('/tierra/gastototal', Tierra.gastoTotal);
api.post('/tierra/estadostierra', Tierra.estadosTierra);
api.post('/tierra/estadosmunicipios', Tierra.estadosMunicipios);
api.post('/tierra/consulta', Tierra.consulta);
api.post('/tierra/gastosubcategoria', Tierra.gastoSubcategorias);

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
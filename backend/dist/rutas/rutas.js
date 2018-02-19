"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const Eventos = require("../functions/eventos.functions");
const Tierra = require("../functions/tierra.functions");
let api = express.Router();
api.post('/eventos/gastototal', Eventos.gastoTotal);
api.post('/eventos/estadoseventos', Eventos.estadosEventos);
api.post('/eventos/gastosubcategoria', Eventos.gastoSubcategorias);
api.post('/eventos/consulta', Eventos.consulta);
api.post('/tierra/gastototal', Tierra.gastoTotal);
api.post('/tierra/estadostierra', Tierra.estadosEventos);
api.post('/tierra/consulta', Tierra.consulta);
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.use('/', api);
module.exports = app;
//# sourceMappingURL=rutas.js.map
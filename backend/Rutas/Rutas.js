var express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();
var funciones = require('../functions/consultas');
var interfisca = require("../connection/mongo");

api.get('/eventoPRI-PVEM-PANAL', interfisca.eventoPRI);
api.get('/tierraPRI-PVEM-PANAL', interfisca.tierraPRI);

api.get('/eventoPAN-PRD-MC', interfisca.eventoPAN);
api.get('/tierraPAN-PRD-MC', interfisca.tierraPAN);

api.get('/eventoMORENA-PT-PES', interfisca.eventoMORENA);
api.get('/tierraMORENA-PT-PES', interfisca.tierraMORENA);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', api);

module.exports = app;
var express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();
var funciones = require('../functions/consultas');
var interfisca = require("../connection/mongo");

api.get('/evento', interfisca.evento);
api.get('/tierra', interfisca.tierra);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', api);

module.exports = app;
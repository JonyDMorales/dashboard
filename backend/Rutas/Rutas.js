var express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();
var funciones = require('../functions/consultas');
var interfisca = require("../connection/mongo").interfisca;


api.get('/evento', (res, req) => {
    interfisca.find({}, function(err, res) {
        if (err) throw err;
        console.log('mensajito pitero ');
        console.log(res);
    });
    res.status(200).send();
    //console.log(interfisca);
    //res.statusCode(200);
});
//api.get('/tierra', );

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', api);

module.exports = app;
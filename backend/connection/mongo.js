var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var interfisca;

var url = "mongodb://integra:Integra2017@fiscadev0-shard-00-00-wntu1.mongodb.net:27017,fiscadev0-shard-00-01-wntu1.mongodb.net:27017,fiscadev0-shard-00-02-wntu1.mongodb.net:27017/test?ssl=true&replicaSet=FiscaDev0-shard-0&authSource=admin";

mongoose.connect(url, (error) => {
    if (error) {
        console.log("Error context: " + error);
    } else {
        console.log("Conexion interfisca exitosa")
    }
});
/*
MongoClient.connect(uri, function(err, client) {
    interfisca = client.db("interfisca").collections("pubfija");
    console.log('Ok');
    console.log(interfisca);
});*/
var schema = new Schema({}, { strict: false });
var interfisca = mongoose.model("pubfija", schema);
module.exports.interfisca = interfisca;
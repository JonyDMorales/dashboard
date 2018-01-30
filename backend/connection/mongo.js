var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var interfisca;

var url = "mongodb://integra:Integra2017@fiscadev0-shard-00-00-wntu1.mongodb.net:27017,fiscadev0-shard-00-01-wntu1.mongodb.net:27017,fiscadev0-shard-00-02-wntu1.mongodb.net:27017/test?ssl=true&replicaSet=FiscaDev0-shard-0&authSource=admin";
//var url = "mongodb://JonyD:1234@ds131621.mlab.com:31621/context";
/*
mongoose.connect(url, (error) => {
    if (error) {
        console.log("Error en mongo: " + error);
    } else {
        console.log("Conexion interfisca exitosa")
    }
});

var schema = new Schema({});
interfisca = mongoose.model('interfisca', schema);
*/
function evento(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('eventofisca');
        interfisca.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

function tierra(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('pubfija');
        interfisca.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}


module.exports = {
    evento,
    tierra
};
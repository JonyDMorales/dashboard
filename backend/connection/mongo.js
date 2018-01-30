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
function eventoPRI(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('eventofisca');
        interfisca.find({ alianza: "PRI-PVEM-PANAL" }).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

function tierraPRI(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('pubfija');
        interfisca.find({ alianza: "PRI-PVEM-PANAL" }).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

function eventoPAN(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('eventofisca');
        interfisca.find({ alianza: "PAN-PRD-MC" }).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

function tierraPAN(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('pubfija');
        interfisca.find({ alianza: "PAN-PRD-MC" }).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

function eventoMORENA(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('eventofisca');
        interfisca.find({ alianza: "MORENA-PT-PES" }).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

function tierraMORENA(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('pubfija');
        interfisca.find({ alianza: "MORENA-PT-PES" }).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs[0]);
            res.send(docs);
        });
    });
}

module.exports = {
    eventoPRI,
    tierraPRI,
    eventoPAN,
    tierraPAN,
    eventoMORENA,
    tierraMORENA
};
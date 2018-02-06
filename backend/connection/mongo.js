var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var interfisca;
var url = "mongodb://integra:Integra2017@fiscadev0-shard-00-00-wntu1.mongodb.net:27017,fiscadev0-shard-00-01-wntu1.mongodb.net:27017,fiscadev0-shard-00-02-wntu1.mongodb.net:27017/test?ssl=true&replicaSet=FiscaDev0-shard-0&authSource=admin";

function gastoTotal(req, res) {
    var alianza = req.headers['alianza'];
    var persona = req.headers['persona'];
    var categoria = req.headers['categoria'];
    var total = 0;

    consultar(alianza, persona, categoria, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (var i of docs) {
            total += i.precio;
            console.log('Entro: ' + i.precio);
        }
        res.send(total);
    });
}

function conteoEventos(req, res) {
    var alianza = req.headers['alianza'];
    var persona = req.headers['persona'];
    var categoria = req.headers['categoria'];
    var eventos = [];

    consultar(alianza, persona, categoria, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (var i of docs) {
            eventos.push(i.estado);
            console.log('Entro: ' + i.estado);
        }
        res.send(eventos);
    });
}

function consultar(alianza, persona, categoria, callback) {

    var query = '';

    if (alianza && persona && categoria) {
        query = '{"alianza":"' + alianza + '", "quienes":{' + persona + '}, "' + categoria + '" : { "$exists": true } }';
    } else if (alianza && persona && !categoria) {
        query = '{"alianza":"' + alianza + '", "quienes":{' + persona + '} }';
    } else if (alianza && !persona && categoria) {
        query = '{"alianza":"' + alianza + '", "' + categoria + '" : { "$exists": true } }';
    } else if (!alianza && persona && categoria) {
        query = '{ "quienes":{' + persona + '},"' + categoria + '" : { "$exists": true } }';
    } else if (!alianza && !persona && categoria) {
        query = '{"' + categoria + '" : { "$exists": true } }';
    } else if (alianza && !persona && !categoria) {
        query = '{ "alianza":"' + alianza + '" }';
    } else if (!alianza && persona && !categoria) {
        query = '{ "quienes":{' + persona + '} }';
    }

    query = JSON.parse(query);
    //res.send(query);
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('interfisca').collection('eventofisca');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs);
            //return resolve(docs);
            callback(docs);
            //res.send(docs);
        });
    });
}

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
    tierraMORENA,
    gastoTotal,
    conteoEventos
};
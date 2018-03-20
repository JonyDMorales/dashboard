var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var interfisca;
var url = "mongodb://integra:Integra2017@fiscadev0-shard-00-00-wntu1.mongodb.net:27017,fiscadev0-shard-00-01-wntu1.mongodb.net:27017,fiscadev0-shard-00-02-wntu1.mongodb.net:27017/test?ssl=true&replicaSet=FiscaDev0-shard-0&authSource=admin";

function consultarEventoFisca(id, alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, callback) {

    let query = {};

    if (id) {
        //query['_id'] = new ObjectID(id);
    }
    if (alianza) {
        query['alianza'] = alianza;
    }
    if (persona) {
        query['quienes.' + persona] = true;
    }
    if (categoria) {
        if (subcategoria) {
            query[categoria + '.subcategoria'] = subcategoria;
        } else {
            query[categoria] = { "$exists": true };
        }
    }
    if (circunscripcion) {
        query['circunscripcion'] = parseInt(circunscripcion);
    }
    if (estado) {
        query['estado'] = estado;
    }
    if (created_at1) {
        if (created_at2) {
            query['fecha'] = { "$gte": new Date(created_at1), "$lte": new Date(created_at2) };
        } else {
            query['fecha'] = { "$gte": new Date(created_at1) };
        }
    }

    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('eventos');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function consultarPubfija(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, callback) {

    let query = {};

    if (alianza) {
        query['alianza'] = alianza;
    }
    if (persona) {
        query['quienes_aparecen.' + persona] = true;
    }
    if (categoria) {
        query['categoria'] = categoria;
    }
    if (subcategoria) {
        query['subcategoria'] = subcategoria;
    }
    if (circunscripcion) {
        query['circunscripcion'] = parseInt(circunscripcion);
    }
    if (estado) {
        query['estado'] = estado;
    }
    if (created_at1) {
        if (created_at2) {
            query['fecha'] = { "$gte": new Date(created_at1), "$lte": new Date(created_at2) };
        } else {
            query['fecha'] = { "$gte": new Date(created_at1) };
        }
    }

    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('pubfija');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

module.exports = {
    consultarEventoFisca,
    consultarPubfija
};
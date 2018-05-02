var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var interfisca;
var url = "mongodb://integra:Integra2017@fiscadev0-shard-00-00-wntu1.mongodb.net:27017,fiscadev0-shard-00-01-wntu1.mongodb.net:27017,fiscadev0-shard-00-02-wntu1.mongodb.net:27017/test?ssl=true&replicaSet=FiscaDev0-shard-0&authSource=admin";

function consultarEventoFisca(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, callback) {

    let query = {};

    if (id) {
        query['_id'] = new ObjectID(id);
    }
    if (alianza) {
        query['alianza'] = alianza;
    }
    if (partido) {
        if (partido == 'PAN') {
            query['partido'] = { '$regex': '^' + partido, '$options': 'i' };
        } else {
            query['partido'] = { '$regex': partido };
        }
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
        interfisca = client.db('resulfisca').collection('filtradoeventos');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function consultarTierraEspecial(partido, persona, circunscripcion, callback) {

    let query = {};

    if (partido) {
        if (partido == 'PAN') {
            query['partido'] = { '$regex': '^' + partido, '$options': 'i' };
        } else {
            query['partido'] = { '$regex': partido };
        }
    }
    if (persona) {
        query['quienes.' + persona] = true;
    }
    if (circunscripcion) {
        query['circunscripcion'] = parseInt(circunscripcion);
    }

    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('filtradotierra');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function consultarEventoEspecial(partido, persona, circunscripcion, callback) {

    let query = {};

    if (partido) {
        if (partido == 'PAN') {
            query['partido'] = { '$regex': '^' + partido, '$options': 'i' };
        } else {
            query['partido'] = { '$regex': partido };
        }
    }
    if (persona) {
        query['quienes.' + persona] = true;
    }
    if (circunscripcion) {
        query['circunscripcion'] = parseInt(circunscripcion);
    }

    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('filtradoeventos');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function obtenerCandidatosEventos(callback) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('datosfinaleseventos');
        interfisca.findOne({ 'candidatos.gobernador': { "$exists": true } }, function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function obtenerPresidenteEventos(callback) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('datosfinaleseventos');
        interfisca.findOne({ 'candidatos.presidente': { "$exists": true } }, function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function obtenerCandidatosTierra(callback) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('datosfinalestierra');
        interfisca.findOne({ 'candidatos.gobernador': { "$exists": true } }, function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function obtenerPresidenteTierra(callback) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('datosfinalestierra');
        interfisca.findOne({ 'candidatos.presidente': { "$exists": true } }, function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

function insertarEventos(respuesta) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('datosfinaleseventos');
        interfisca.insert({ candidatos: respuesta, created_at: new Date() });
    });
}

function insertarTierra(respuesta) {
    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('datosfinalestierra');
        /*interfisca.update({ _id: new ObjectID(id) }, {
            $set: respuesta,
            $set: { updated_at: new Date() }
            //$set: { created_at: new Date() }
        }, { upsert: true });*/
        interfisca.insert({ candidatos: respuesta, created_at: new Date() });
    });
}

function consultarPubfija(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, callback) {

    let query = {};

    if (id) {
        query['_id'] = new ObjectID(id);
    }
    if (alianza) {
        query['alianza'] = alianza;
    }
    if (partido) {
        if (partido == 'PAN') {
            query['partido'] = { '$regex': '^' + partido, '$options': 'i' };
        } else {
            query['partido'] = { '$regex': partido };
        }
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
            query['created_at'] = { "$gte": new Date(created_at1), "$lte": new Date(created_at2) };
        } else {
            query['created_at'] = { "$gte": new Date(created_at1) };
        }
    }

    MongoClient.connect(url, function(err, client) {
        if (err) { console.error(err); return; }
        interfisca = client.db('resulfisca').collection('filtradotierra');
        interfisca.find(query).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
            client.close();
        });
    });
}

module.exports = {
    consultarEventoEspecial,
    consultarTierraEspecial,
    insertarEventos,
    insertarTierra,
    consultarEventoFisca,
    consultarPubfija,
    obtenerCandidatosEventos,
    obtenerPresidenteEventos,
    obtenerCandidatosTierra,
    obtenerPresidenteTierra
};
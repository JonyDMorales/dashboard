var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var interfisca;
var url = "mongodb://integra:Integra2017@fiscadev0-shard-00-00-wntu1.mongodb.net:27017,fiscadev0-shard-00-01-wntu1.mongodb.net:27017,fiscadev0-shard-00-02-wntu1.mongodb.net:27017/test?ssl=true&replicaSet=FiscaDev0-shard-0&authSource=admin";

function consultarEventoFisca(alianza, persona, categoria, subcategoria, callback) {

    var query = '';

    if (alianza && persona && categoria) {
        if (subcategoria) {
            query = '{"alianza":"' + alianza + '", "quienes.' + persona + '": true, "' + categoria + '.subcategoria": "' + subcategoria + '" }';
        } else {
            query = '{"alianza":"' + alianza + '", "quienes.' + persona + '": true, "' + categoria + '" : { "$exists": true } }';
        }
    } else if (alianza && persona && !categoria) {
        query = '{"alianza":"' + alianza + '", "quienes.' + persona + '": true }';
    } else if (alianza && !persona && categoria) {
        if (subcategoria) {
            query = '{"alianza":"' + alianza + '", "' + categoria + '.subcategoria" :"' + subcategoria + '" }';
        } else {
            query = '{"alianza":"' + alianza + '", "' + categoria + '" : { "$exists": true } }';
        }
    } else if (!alianza && persona && categoria) {
        if (subcategoria) {
            query = '{ "quienes.' + persona + '": true,"' + categoria + '.subcategoria" : "' + subcategoria + '"  }';
        } else {
            query = '{ "quienes.' + persona + '": true,"' + categoria + '" : { "$exists": true } }';
        }
    } else if (!alianza && !persona && categoria) {
        if (subcategoria) {
            query = '{"' + categoria + '.subcategoria" : "' + subcategoria + '"  }';
        } else {
            query = '{"' + categoria + '" : { "$exists": true } }';
        }
    } else if (alianza && !persona && !categoria) {
        query = '{ "alianza":"' + alianza + '" }';
    } else if (!alianza && persona && !categoria) {
        query = '{ "quienes.' + persona + '": true }';
    }

    query = JSON.parse(query);

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

function consultarPubfija(alianza, persona, categoria, subcategoria, callback) {

    var query = '';

    if (alianza && persona && categoria) {
        if (subcategoria) {
            query = '{"alianza":"' + alianza + '", "quienes_aparecen.' + persona + '": true,  "categoria": "' + categoria + '", "subcategoria": "' + subcategoria + '" }';
        } else {
            query = '{"alianza":"' + alianza + '", "quienes_aparecen.' + persona + '": true,  "categoria": "' + categoria + '" }';
        }
    } else if (alianza && persona && !categoria) {
        query = '{"alianza":"' + alianza + '", "quienes_aparecen.' + persona + '": true }';
    } else if (alianza && !persona && categoria) {
        if (subcategoria) {
            query = '{"alianza":"' + alianza + '", "categoria": "' + categoria + '", "subcategoria": "' + subcategoria + '" }';
        } else {
            query = '{"alianza":"' + alianza + '", "categoria": "' + categoria + '" }';
        }
    } else if (!alianza && persona && categoria) {
        if (subcategoria) {
            query = '{ "quienes_aparecen.' + persona + '": true, "categoria": "' + categoria + '", "subcategoria": "' + subcategoria + '" }';
        } else {
            query = '{ "quienes_aparecen.' + persona + '": true, "categoria": "' + categoria + '" }';
        }
    } else if (!alianza && !persona && categoria) {
        if (subcategoria) {
            query = '{ "categoria": "' + categoria + '", "subcategoria": "' + subcategoria + '" }';
        } else {
            query = '{ "categoria": "' + categoria + '" }';
        }
    } else if (alianza && !persona && !categoria) {
        query = '{ "alianza":"' + alianza + '" }';
    } else if (!alianza && persona && !categoria) {
        query = '{ "quienes_aparecen.' + persona + '": true }';
    }

    query = JSON.parse(query);

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
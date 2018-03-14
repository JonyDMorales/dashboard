var interfisca = require("../connection/mongo");

function consulta(req, res) {
    let alianza = req.body['alianza'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];

    interfisca.consultarPubfija(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (docs)
            res.send(docs);
        else
            res.send('');
    });
}

function gastoTotal(req, res) {
    let alianza = req.body['alianza'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];
    var total = 0;

    interfisca.consultarPubfija(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (var i of docs) {
            if (i.precio)
                total += i.precio;
        }
        res.send({ total: total });
    });
}

function estadosEventos(req, res) {
    let alianza = req.body['alianza'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];

    let estados = {
        'AGUASCALIENTES': { conteo: 0, gasto: 0 },
        'BAJA CALIFORNIA': { conteo: 0, gasto: 0 },
        'BAJA CALIFORNIA SUR': { conteo: 0, gasto: 0 },
        'CAMPECHE': { conteo: 0, gasto: 0 },
        'COAHUILA': { conteo: 0, gasto: 0 },
        'COLIMA': { conteo: 0, gasto: 0 },
        'CHIAPAS': { conteo: 0, gasto: 0 },
        'CHIHUAHUA': { conteo: 0, gasto: 0 },
        'CIUDAD DE MÉXICO': { conteo: 0, gasto: 0 },
        'DURANGO': { conteo: 0, gasto: 0 },
        'GUANAJUATO': { conteo: 0, gasto: 0 },
        'GUERRERO': { conteo: 0, gasto: 0 },
        'HIDALGO': { conteo: 0, gasto: 0 },
        'JALISCO': { conteo: 0, gasto: 0 },
        'MÉXICO': { conteo: 0, gasto: 0 },
        'MICHOACÁN': { conteo: 0, gasto: 0 },
        'MORELOS': { conteo: 0, gasto: 0 },
        'NAYARIT': { conteo: 0, gasto: 0 },
        'NUEVO LEÓN': { conteo: 0, gasto: 0 },
        'OAXACA': { conteo: 0, gasto: 0 },
        'PUEBLA': { conteo: 0, gasto: 0 },
        'QUERÉTARO': { conteo: 0, gasto: 0 },
        'QUINTANA ROO': { conteo: 0, gasto: 0 },
        'SAN LUIS POTOSÍ': { conteo: 0, gasto: 0 },
        'SINALOA': { conteo: 0, gasto: 0 },
        'SONORA': { conteo: 0, gasto: 0 },
        'TABASCO': { conteo: 0, gasto: 0 },
        'TAMAULIPAS': { conteo: 0, gasto: 0 },
        'TLAXCALA': { conteo: 0, gasto: 0 },
        'VERACRUZ': { conteo: 0, gasto: 0 },
        'YUCATÁN': { conteo: 0, gasto: 0 },
        'ZACATECAS': { conteo: 0, gasto: 0 }
    };

    interfisca.consultarPubfija(alianza, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (let i of docs) {
            if (estados[i.estado]) {
                let estado = estados[i.estado];
                estado.conteo += 1;
                if (i.precio) {
                    estado.gasto += i.precio;
                }
                estados[i.estado] = estado;
            }
        }
        res.send({ estados: estados });
    });
}
module.exports = {
    consulta,
    gastoTotal,
    estadosEventos
};
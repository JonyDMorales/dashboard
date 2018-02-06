var interfisca = require("../connection/mongo");

function consulta(req, res) {
    var alianza = req.headers['alianza'];
    var persona = req.headers['persona'];
    var categoria = req.headers['categoria'];

    interfisca.consultarEventoFisca(alianza, persona, categoria, function(docs) {
        if (docs)
            res.send(docs);
        else
            res.send('');
    });
}

function gastoTotal(req, res) {
    var alianza = req.headers['alianza'];
    var persona = req.headers['persona'];
    var categoria = req.headers['categoria'];
    var total = 0;

    interfisca.consultarEventoFisca(alianza, persona, categoria, function(docs) {
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

function conteoEventos(req, res) {
    var alianza = req.headers['alianza'];
    var persona = req.headers['persona'];
    var categoria = req.headers['categoria'];

    var eventos = {
        'AGUASCALIENTES': 0,
        'BAJA CALIFORNIA': 0,
        'BAJA CALIFORNIA SUR': 0,
        'CAMPECHE': 0,
        'COAHUILA DE ZARAGOZA': 0,
        'COLIMA': 0,
        'CHIAPAS': 0,
        'CHIHUAHUA': 0,
        'DISTRITO FEDERAL': 0,
        'DURANGO': 0,
        'GUANAJUATO': 0,
        'GUERRERO': 0,
        'HIDALGO': 0,
        'JALISCO': 0,
        'MÉXICO': 0,
        'MICHOACÁN DE OCAMPO': 0,
        'MORELOS': 0,
        'NAYARIT': 0,
        'NUEVO LEÓN': 0,
        'OAXACA': 0,
        'PUEBLA': 0,
        'QUERÉTARO': 0,
        'QUINTANAROO': 0,
        'SAN LUIS POTOSÍ': 0,
        'SINALOA': 0,
        'SONORA': 0,
        'TABASCO': 0,
        'TAMAULIPAS': 0,
        'TLAXCALA': 0,
        'VERACRUZ DE IGNACIO DE LA LLAVE': 0,
        'YUCATÁN': 0,
        'ZACATECAS': 0
    };

    interfisca.consultarEventoFisca(alianza, persona, categoria, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (var i of docs) {
            if (i.estado) {
                eventos[i.estado] += 1;
            }
        }
        res.send({ eventos: eventos });
    });
}

function gastoEventos(req, res) {
    var alianza = req.headers['alianza'];
    var persona = req.headers['persona'];
    var categoria = req.headers['categoria'];

    var eventos = {
        'AGUASCALIENTES': 0,
        'BAJA CALIFORNIA': 0,
        'BAJA CALIFORNIA SUR': 0,
        'CAMPECHE': 0,
        'COAHUILA DE ZARAGOZA': 0,
        'COLIMA': 0,
        'CHIAPAS': 0,
        'CHIHUAHUA': 0,
        'DISTRITO FEDERAL': 0,
        'DURANGO': 0,
        'GUANAJUATO': 0,
        'GUERRERO': 0,
        'HIDALGO': 0,
        'JALISCO': 0,
        'MÉXICO': 0,
        'MICHOACÁN DE OCAMPO': 0,
        'MORELOS': 0,
        'NAYARIT': 0,
        'NUEVO LEÓN': 0,
        'OAXACA': 0,
        'PUEBLA': 0,
        'QUERÉTARO': 0,
        'QUINTANAROO': 0,
        'SAN LUIS POTOSÍ': 0,
        'SINALOA': 0,
        'SONORA': 0,
        'TABASCO': 0,
        'TAMAULIPAS': 0,
        'TLAXCALA': 0,
        'VERACRUZ DE IGNACIO DE LA LLAVE': 0,
        'YUCATÁN': 0,
        'ZACATECAS': 0
    };

    interfisca.consultarEventoFisca(alianza, persona, categoria, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (var i of docs) {
            if (i.estado) {
                eventos[i.estado] += i.precio;
            }
        }
        res.send({ eventos: eventos });
    });
}

module.exports = {
    consulta,
    gastoTotal,
    conteoEventos,
    gastoEventos
};
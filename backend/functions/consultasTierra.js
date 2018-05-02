var interfisca = require("../connection/mongo");

function consulta(req, res) {
    let id = req.body['id'];
    let alianza = req.body['alianza'];
    let partido = req.body['partido'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];

    interfisca.consultarPubfija(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (docs)
            res.send(docs);
        else
            res.send('');
    });
}

function gastoTotal(req, res) {
    let id = req.body['id'];
    let alianza = req.body['alianza'];
    let partido = req.body['partido'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];
    var total = 0;
    var conteo = 0;

    interfisca.consultarPubfija(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        if (persona == 'presidente') {
            for (let i of docs) {
                if (i.precio_presidente) {
                    conteo += i.cantidad;
                    total += i.precio_presidente;
                }
            }
        } else if (persona == 'gobernador') {
            for (let i of docs) {
                if (i.precio_gobernador) {
                    conteo += i.cantidad;
                    total += i.precio_gobernador;
                }
            }
        } else if (persona == 'alcalde') {
            for (let i of docs) {
                if (i.precio_alcalde) {
                    conteo += i.cantidad;
                    total += i.precio_alcalde;
                }
            }
        } else {
            for (let i of docs) {
                if (i.precio) {
                    conteo += i.cantidad;
                    total += i.precio;
                }
            }
        }

        res.send({ total: total, conteo: conteo });
    });
}

function estadosMunicipios(req, res) {
    let id = req.body['id'];
    let alianza = req.body['alianza'];
    let partido = req.body['partido'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];

    let estados = {
        'CIUDAD DE MEXICO': {
            'ALVARO OBREGON': { conteo: 0, gasto: 0 },
            'AZCAPOTZALCO': { conteo: 0, gasto: 0 },
            'BENITO JUAREZ': { conteo: 0, gasto: 0 },
            'COYOACAN': { conteo: 0, gasto: 0 },
            'CUAJIMALPA DE MORELOS': { conteo: 0, gasto: 0 },
            'CUAUTHEMOC': { conteo: 0, gasto: 0 },
            'GUSTAVO A. MADERO': { conteo: 0, gasto: 0 },
            'IZTACALCO': { conteo: 0, gasto: 0 },
            'IZTAPALAPA': { conteo: 0, gasto: 0 },
            'LA MAGDALENA CONTRERAS': { conteo: 0, gasto: 0 },
            'MIGUEL HIDALGO': { conteo: 0, gasto: 0 },
            'MILPA ALTA': { conteo: 0, gasto: 0 },
            'TLAHUAC': { conteo: 0, gasto: 0 },
            'TLALPAN': { conteo: 0, gasto: 0 },
            'VENUSTIANO CARRANZA': { conteo: 0, gasto: 0 },
            'XOCHIMILCO': { conteo: 0, gasto: 0 }
        },
        'GUERRERO': {
            'ACAPULCO DE JUAREZ': { conteo: 0, gasto: 0 },
            'CHILPANCINGO DE LOS BRAVO': { conteo: 0, gasto: 0 },
            'IGUALA DE LA INDEPENDENCIA': { conteo: 0, gasto: 0 },
            'CHILAPA DE ALVAREZ': { conteo: 0, gasto: 0 },
            'ZIHUATANEJO DE AZUETA': { conteo: 0, gasto: 0 }
        },
        'MORELOS': {
            'CUERNAVACA': { conteo: 0, gasto: 0 },
            'JIUTEPEC': { conteo: 0, gasto: 0 },
            'CUAUTLA': { conteo: 0, gasto: 0 },
            'TEMIXCO': { conteo: 0, gasto: 0 },
            'YAUTEPEC': { conteo: 0, gasto: 0 }
        },
        'PUEBLA': {
            'PUEBLA': { conteo: 0, gasto: 0 },
            'TEHUACAN': { conteo: 0, gasto: 0 },
            'SAN MARTIN TEXMELUCAN': { conteo: 0, gasto: 0 },
            'ATLIXCO': { conteo: 0, gasto: 0 },
            'SAN PEDRO CHOLULA': { conteo: 0, gasto: 0 }
        },
        'TLAXCALA': {
            'TLAXCALA': { conteo: 0, gasto: 0 },
            'HUAMANTLA': { conteo: 0, gasto: 0 }
        }
    };

    interfisca.consultarPubfija(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (let i of docs) {
            if (estados[i.estado]) {
                if (estados[i.estado][i.municipio]) {
                    let estado = estados[i.estado][i.municipio];
                    if (persona == 'presidente') {
                        if (i.precio_presidente) {
                            estado.conteo += 1;
                            estado.gasto += i.precio_presidente;
                        }
                    } else if (persona == 'gobernador') {
                        if (i.precio_gobernador) {
                            estado.conteo += 1;
                            estado.gasto += i.precio_gobernador;
                        }
                    } else if (persona == 'alcalde') {
                        if (i.precio_alcalde) {
                            estado.conteo += 1;
                            estado.gasto += i.precio_alcalde;
                        }
                    } else {
                        if (i.precio) {
                            estado.conteo += 1;
                            estado.gasto += i.precio;
                        }
                    }
                    estados[i.estado][i.municipio] = estado;
                }
            }
        }
        res.send({ estados: estados });
    });
}

function estadosTierra(req, res) {
    let id = req.body['id'];
    let alianza = req.body['alianza'];
    let partido = req.body['partido'];
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
        'CIUDAD DE MEXICO': { conteo: 0, gasto: 0 },
        'DURANGO': { conteo: 0, gasto: 0 },
        'GUANAJUATO': { conteo: 0, gasto: 0 },
        'GUERRERO': { conteo: 0, gasto: 0 },
        'HIDALGO': { conteo: 0, gasto: 0 },
        'JALISCO': { conteo: 0, gasto: 0 },
        'MEXICO': { conteo: 0, gasto: 0 },
        'MICHOACAN': { conteo: 0, gasto: 0 },
        'MORELOS': { conteo: 0, gasto: 0 },
        'NAYARIT': { conteo: 0, gasto: 0 },
        'NUEVO LEON': { conteo: 0, gasto: 0 },
        'OAXACA': { conteo: 0, gasto: 0 },
        'PUEBLA': { conteo: 0, gasto: 0 },
        'QUERETARO': { conteo: 0, gasto: 0 },
        'QUINTANA ROO': { conteo: 0, gasto: 0 },
        'SAN LUIS POTOSI': { conteo: 0, gasto: 0 },
        'SINALOA': { conteo: 0, gasto: 0 },
        'SONORA': { conteo: 0, gasto: 0 },
        'TABASCO': { conteo: 0, gasto: 0 },
        'TAMAULIPAS': { conteo: 0, gasto: 0 },
        'TLAXCALA': { conteo: 0, gasto: 0 },
        'VERACRUZ': { conteo: 0, gasto: 0 },
        'YUCATAN': { conteo: 0, gasto: 0 },
        'ZACATECAS': { conteo: 0, gasto: 0 }
    };

    interfisca.consultarPubfija(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (let i of docs) {
            if (estados[i.estado]) {
                let estado = estados[i.estado];
                if (persona == 'presidente') {

                    if (i.precio_presidente) {
                        estado.conteo += i.cantidad;
                        estado.gasto += i.precio_presidente;
                    }

                } else if (persona == 'gobernador') {

                    if (i.precio_gobernador) {
                        estado.conteo += i.cantidad;
                        estado.gasto += i.precio_gobernador;
                    }

                } else if (persona == 'alcalde') {

                    if (i.precio_alcalde) {
                        estado.conteo += i.cantidad;
                        estado.gasto += i.precio_alcalde;
                    }

                } else {

                    if (i.precio) {
                        estado.conteo += i.cantidad;
                        estado.gasto += i.precio;
                    }

                }
                estados[i.estado] = estado;
            }
        }
        res.send({ estados: estados });
    });
}

function gastoSubcategorias(req, res) {
    let id = req.body['id'];
    let alianza = req.body['alianza'];
    let partido = req.body['partido'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let circunscripcion = req.body['circunscripcion'];
    let estado = req.body['estado'];
    let created_at1 = req.body['created_at1'];
    let created_at2 = req.body['created_at2'];
    let subcategorias = {
        gasto: {},
        conteo: {}
    }
    switch (categoria) {
        case 'fija':
            subcategorias['gasto'] = {
                'bardas': 0,
                'buzones': 0,
                'cajas de Luz': 0,
                'carteles': 0,
                'espectaculares': 0,
                'espectaculares de pantallas digitales': 0,
                'kioscos': 0,
                'lonas': 0,
                'mantas (igual o mayor a 12 mts)': 0,
                'mantas (menores a 12 mts)': 0,
                'marquesinas': 0,
                'muebles urbanos': 0,
                'pantallas fijas': 0,
                'parabuses': 0,
                'pendones': 0,
                'propaganda en columnas': 0,
                'puentes': 0,
                'valla digital': 0,
                'volantes': 0,
                'otros': 0
            };
            subcategorias['conteo'] = {
                'bardas': 0,
                'buzones': 0,
                'cajas de Luz': 0,
                'carteles': 0,
                'espectaculares': 0,
                'espectaculares de pantallas digitales': 0,
                'kioscos': 0,
                'lonas': 0,
                'mantas (igual o mayor a 12 mts)': 0,
                'mantas (menores a 12 mts)': 0,
                'marquesinas': 0,
                'muebles urbanos': 0,
                'pantallas fijas': 0,
                'parabuses': 0,
                'pendones': 0,
                'propaganda en columnas': 0,
                'puentes': 0,
                'valla digital': 0,
                'volantes': 0,
                'otros': 0
            };
            break;

        case 'movil':
            subcategorias['gasto'] = {
                'bicicletas,bicitaxis,mototaxis': 0,
                'brigadas': 0,
                'metro': 0,
                'perifoneo': 0,
                'transporte publico': 0,
                'vehiculos particulares': 0,
                'vehiculos publicitarios': 0,
                'otros': 0
            };
            subcategorias['conteo'] = {
                'bicicletas,bicitaxis,mototaxis': 0,
                'brigadas': 0,
                'metro': 0,
                'perifoneo': 0,
                'transporte publico': 0,
                'vehiculos particulares': 0,
                'vehiculos publicitarios': 0,
                'otros': 0
            };
            break;
    }

    interfisca.consultarPubfija(id, alianza, partido, persona, categoria, '', circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (let subcatego of Object.keys(subcategorias['gasto'])) {
            for (let i of docs) {
                if (i.subcategoria == subcatego) {
                    if (i.precio && i.cantidad) {
                        subcategorias['gasto'][subcatego] += i.precio;
                        subcategorias['conteo'][subcatego] += i.cantidad;
                    }
                }
            }
        }
    });

    setTimeout(() => {
        res.send({ subcategorias: subcategorias });
    }, 3000);
}

module.exports = {
    consulta,
    gastoTotal,
    estadosTierra,
    estadosMunicipios,
    gastoSubcategorias
};
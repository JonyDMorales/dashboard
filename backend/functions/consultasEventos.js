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

    interfisca.consultarEventoFisca(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {

        if (docs) {
            res.send(docs);
        } else {
            res.send('');
        }
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
    let total = 0;
    let conteo = 0;

    interfisca.consultarEventoFisca(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        if (persona == 'presidente') {
            for (let i of docs) {
                if (i.precio_presidente) {
                    conteo += 1;
                    total += i.precio_presidente;
                }
            }
        } else if (persona == 'gobernador') {
            for (let i of docs) {
                if (i.precio_gobernador) {
                    conteo += 1;
                    total += i.precio_gobernador;
                }
            }
        } else if (persona == 'alcalde') {
            for (let i of docs) {
                if (i.precio_alcalde) {
                    conteo += 1;
                    total += i.precio_alcalde;
                }
            }
        } else {
            for (let i of docs) {
                if (i.precio) {
                    conteo += 1;
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

    interfisca.consultarEventoFisca(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
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

function estadosEventos(req, res) {
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

    interfisca.consultarEventoFisca(id, alianza, partido, persona, categoria, subcategoria, circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (let i of docs) {
            if (estados[i.estado]) {
                let estado = estados[i.estado];
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
        case 'estructura':
            subcategorias['gasto'] = {
                'banner': 0,
                'baños publicos': 0,
                'carpas': 0,
                'escenario': 0,
                'gradas': 0,
                'mampara': 0,
                'mesas': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'sillas': 0,
                'sillones': 0,
                'templete': 0,
                'vallas': 0
            };
            subcategorias['conteo'] = {
                'banner': 0,
                'baños publicos': 0,
                'carpas': 0,
                'escenario': 0,
                'gradas': 0,
                'mampara': 0,
                'mesas': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'sillas': 0,
                'sillones': 0,
                'templete': 0,
                'vallas': 0
            };
            break;

        case 'animacion':
            subcategorias['gasto'] = {
                'animacion': 0,
                'edecanes': 0,
                'grupos musicales / djs': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0
            };
            subcategorias['conteo'] = {
                'animacion': 0,
                'edecanes': 0,
                'grupos musicales / djs': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
            };
            break;

        case 'transporte':
            subcategorias['gasto'] = {
                'automoviles': 0,
                'camiones': 0,
                'camionetas': 0,
                'combi/microbus': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'taxi': 0
            };
            subcategorias['conteo'] = {
                'automoviles': 0,
                'camiones': 0,
                'camionetas': 0,
                'combi/microbus': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'taxi': 0
            };
            break;

        case 'produccion':
            subcategorias['gasto'] = {
                'computadoras': 0,
                'consola de audio': 0,
                'drone': 0,
                'equipo de audio': 0,
                'estructura del partido': 0,
                'gruas de camara': 0,
                'luces': 0,
                'microfonos': 0,
                'muro de video (mas de 2 pantallas)': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'pantallas': 0,
                'personal de seguridad': 0,
                'plantas de luz': 0,
                'proyectores': 0,
                'camaras de video': 0,
                'servicio medico': 0
            };
            subcategorias['conteo'] = {
                'computadoras': 0,
                'consola de audio': 0,
                'drone': 0,
                'equipo de audio': 0,
                'estructura del partido': 0,
                'gruas de camara': 0,
                'luces': 0,
                'microfonos': 0,
                'muro de video (mas de 2 pantallas)': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'pantallas': 0,
                'personal de seguridad': 0,
                'plantas de luz': 0,
                'proyectores': 0,
                'camaras de video': 0,
                'servicio medico': 0
            };
            break;

        case 'espectacular':
            subcategorias['gasto'] = {
                'inflable': 0,
                'lonas': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'pendones': 0
            };
            subcategorias['conteo'] = {
                'inflable': 0,
                'lonas': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'pendones': 0
            };
            break;

        case 'utilitario':
            subcategorias['gasto'] = {
                'abanicos': 0,
                'aguas': 0,
                'banderas': 0,
                'bolsas': 0,
                'botones': 0,
                'camisas': 0,
                'chaleco': 0,
                'chamarras': 0,
                'cobija': 0,
                'gorras': 0,
                'impermeable': 0,
                'lonches': 0,
                'mandiles': 0,
                'mangas': 0,
                'mantas (igual o mayor a 12 mts)': 0,
                'mantas (menores a 12 mts)': 0,
                'microperforadores': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'paliacates': 0,
                'playeras': 0,
                'pulseras': 0,
                'refrescos': 0,
                'sombrillas': 0,
                'stickers': 0,
                'sudadera': 0,
                'tortilleros': 0,
                'vasos': 0,
                'vinilonas': 0,
                'volantes': 0,
            };
            subcategorias['conteo'] = {
                'abanicos': 0,
                'aguas': 0,
                'banderas': 0,
                'bolsas': 0,
                'botones': 0,
                'camisas': 0,
                'chaleco': 0,
                'chamarras': 0,
                'cobija': 0,
                'gorras': 0,
                'impermeable': 0,
                'lonches': 0,
                'mandiles': 0,
                'mangas': 0,
                'mantas (igual o mayor a 12 mts)': 0,
                'mantas (menores a 12 mts)': 0,
                'microperforadores': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'paliacates': 0,
                'playeras': 0,
                'pulseras': 0,
                'refrescos': 0,
                'sombrillas': 0,
                'stickers': 0,
                'sudadera': 0,
                'tortilleros': 0,
                'vasos': 0,
                'vinilonas': 0,
                'volantes': 0,
            };
            break;
    }

    interfisca.consultarEventoFisca(id, alianza, partido, persona, categoria, '', circunscripcion, estado, created_at1, created_at2, function(docs) {
        if (!docs) {
            res.send('');
        }

        for (let subcatego of Object.keys(subcategorias['gasto'])) {
            for (let i of docs) {
                if (i[categoria]) {
                    for (var array of i[categoria]) {
                        if (array.subcategoria === subcatego) {
                            if (array.precio) {
                                subcategorias['gasto'][subcatego] += array.precio;
                                subcategorias['conteo'][subcatego] += array.cantidad;
                            }
                        }
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
    estadosEventos,
    estadosMunicipios,
    gastoSubcategorias
};
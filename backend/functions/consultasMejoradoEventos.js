var interfisca = require("../connection/mongo");
let part = {};

function subcategoriasCategoria(categoria) {
    let respuesta = {
        gasto: {},
        conteo: {}
    }
    switch (categoria) {
        case 'estructura':
            respuesta['gasto'] = {
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
            respuesta['conteo'] = {
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
            respuesta['gasto'] = {
                'animacion': 0,
                'edecanes': 0,
                'grupos musicales / djs': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0
            };
            respuesta['conteo'] = {
                'animacion': 0,
                'edecanes': 0,
                'grupos musicales / djs': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
            };
            break;

        case 'transporte':
            respuesta['gasto'] = {
                'automoviles': 0,
                'camiones': 0,
                'camionetas': 0,
                'combi/microbus': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'taxi': 0
            };
            respuesta['conteo'] = {
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
            respuesta['gasto'] = {
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
            respuesta['conteo'] = {
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
            respuesta['gasto'] = {
                'inflable': 0,
                'lonas': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'pendones': 0
            };
            respuesta['conteo'] = {
                'inflable': 0,
                'lonas': 0,
                'otros': 0,
                'otros 2': 0,
                'otros 3': 0,
                'pendones': 0
            };
            break;

        case 'utilitario':
            respuesta['gasto'] = {
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
            respuesta['conteo'] = {
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
    return respuesta;
}

function municipiosEstado(estado) {
    let municipios = [];
    switch (estado) {
        case 'CIUDAD DE MEXICO':
            municipios = [
                'ALVARO OBREGON',
                'AZCAPOTZALCO',
                'BENITO JUAREZ',
                'COYOACAN',
                'CUAJIMALPA DE MORELOS',
                'CUAUTHEMOC',
                'GUSTAVO A. MADERO',
                'IZTACALCO',
                'IZTAPALAPA',
                'LA MAGDALENA CONTRERAS',
                'MIGUEL HIDALGO',
                'MILPA ALTA',
                'TLAHUAC',
                'TLALPAN',
                'VENUSTIANO CARRANZA',
                'XOCHIMILCO'
            ];
            break;
        case 'MORELOS':
            municipios = ['CUERNAVACA', 'JIUTEPEC', 'CUAUTLA', 'TEMIXCO', 'YAUTEPEC'];
            break;
        case 'PUEBLA':
            municipios = ['PUEBLA', 'TEHUACAN', 'SAN MARTIN TEXMELUCAN', 'ATLIXCO', 'SAN PEDRO CHOLULA'];
            break;
        case 'GUERRERO':
            municipios = ['ACAPULCO DE JUAREZ', 'CHILPANCINGO DE LOS BRAVO', 'IGUALA DE LA INDEPENDENCIA', 'CHILAPA DE ALVAREZ', 'ZIHUATANEJO DE AZUETA'];
            break;
        case 'TLAXCALA':
            municipios = ['TLAXCALA', 'HUAMANTLA'];
            break;
    }
    return municipios;
}

function laMagicaCandidatos(callback) {
    let candidatos = ['gobernador', 'alcalde'];
    let partidos = ['PAN', 'PRD', 'MC', 'PRI', 'PVEM', 'PANAL', 'MORENA', 'PT', 'PES'];
    let estados = ['MORELOS', 'PUEBLA', 'GUERRERO', 'TLAXCALA', 'CIUDAD DE MEXICO'];
    let categorias = ['estructura', 'espectacular', 'utilitario', 'transporte', 'produccion', 'animacion'];
    let respuesta = {};
    interfisca.consultarEventoEspecial('', '', 4, function(docs) {
        if (!docs) {
            callback('');
        }

        for (candidato of candidatos) {
            respuesta[candidato] = [];
            for (partido of partidos) {
                let part = {};
                let circuns = {};
                part[partido] = [];
                circuns['circunscripcion_4'] = [];
                let esta = {};
                for (estado of estados) {
                    esta[estado] = [];
                    let municipios = municipiosEstado(estado);
                    let muni = {};
                    for (municipio of municipios) {
                        muni[municipio] = [];
                        let catego = {};
                        for (categoria of categorias) {
                            catego[categoria] = [];
                            catego['precio_sede'] = 0;
                            catego['conteo'] = 0;
                            let subcategorias = subcategoriasCategoria(categoria);
                            for (i of docs) {
                                if (i.quienes[candidato] && i.partido && i.estado && i.municipio) {
                                    if (i.quienes[candidato] && (i.partido).includes(partido) && (i.estado === estado) && (i.municipio === municipio)) {
                                        catego['precio_sede'] += i['precio_sede'];
                                        catego['conteo'] += 1;
                                        console.log('Entro: ' + partido + '  ' + estado + '  ' + municipio);
                                    }
                                }
                                for (subcategoria of Object.keys(subcategorias.gasto)) {
                                    if (i[categoria]) {
                                        for (array of i[categoria]) {
                                            if (i.quienes[candidato] && i[categoria] && array.subcategoria && i.partido && i.estado && i.municipio) {
                                                if (i.quienes[candidato] && (i.partido).includes(partido) && array.subcategoria == subcategoria && (i.estado === estado) && (i.municipio === municipio) && array.precio && array.cantidad) {
                                                    //console.log('Entro: ' + partido + '  ' + estado + '  ' + municipio + '  ' + categoria + '  ' + array.subcategoria + '  ' + array.precio + '  ' + array.cantidad);
                                                    subcategorias.gasto[subcategoria] += array.precio;
                                                    subcategorias.conteo[subcategoria] += array.cantidad;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            catego[categoria].push(subcategorias);
                        }
                        muni[municipio].push(catego);
                    }
                    esta[estado].push(muni);
                }
                circuns['circunscripcion_4'].push(esta);
                part[partido].push(circuns);
                respuesta[candidato].push(part);
            }
        }
    });

    setTimeout(() => {
        callback(respuesta);
    }, 55000);
}

function laMagicaPresidente(callback) {
    let alianzas = ['PAN-PRD-MC', 'PRI-PVEM-PANAL', 'MORENA-PT-PES'];
    let estados = ['MORELOS', 'PUEBLA', 'GUERRERO', 'TLAXCALA', 'CIUDAD DE MEXICO'];
    let categorias = ['estructura', 'espectacular', 'utilitario', 'transporte', 'produccion', 'animacion'];
    let respuesta = {};
    let candidato = 'presidente';
    interfisca.consultarEventoEspecial('', candidato, 4, function(docs) {
        if (!docs) {
            callback('');
        }

        respuesta[candidato] = [];
        for (alianza of alianzas) {
            let part = {};
            let circuns = {};
            part[alianza] = [];
            circuns['circunscripcion_4'] = [];
            let esta = {};
            for (estado of estados) {
                esta[estado] = [];
                let municipios = municipiosEstado(estado);
                let muni = {};
                for (municipio of municipios) {
                    muni[municipio] = [];
                    let catego = {};
                    for (categoria of categorias) {
                        catego[categoria] = [];
                        catego['precio_sede'] = 0;
                        catego['conteo'] = 0;
                        let subcategorias = subcategoriasCategoria(categoria);
                        for (i of docs) {
                            if (i.quienes[candidato] && i.alianza && i.estado && i.municipio) {
                                if (i.quienes[candidato] && (i.alianza == alianza) && (i.estado === estado) && (i.municipio === municipio)) {
                                    catego['precio_sede'] += i['precio_sede'];
                                    catego['conteo'] += 1;
                                }
                            }
                            for (subcategoria of Object.keys(subcategorias.gasto)) {
                                if (i[categoria]) {
                                    for (array of i[categoria]) {
                                        if (i.quienes[candidato] && i[categoria] && array.subcategoria && i.alianza && i.estado && i.municipio) {
                                            if (i.quienes[candidato] && (i.alianza == alianza) && array.subcategoria == subcategoria && (i.estado === estado) && (i.municipio === municipio) && array.precio && array.cantidad) {
                                                subcategorias.gasto[subcategoria] += array.precio;
                                                subcategorias.conteo[subcategoria] += array.cantidad;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        catego[categoria].push(subcategorias);
                    }
                    muni[municipio].push(catego);
                }
                esta[estado].push(muni);
            }
            circuns['circunscripcion_4'].push(esta);
            part[alianza].push(circuns);
            respuesta[candidato].push(part);
        }

    });

    setTimeout(() => {
        callback(respuesta);
    }, 55000);
}

function generarInsercionesCandidatos(req, res) {
    laMagicaCandidatos(function(respuesta) {
        interfisca.insertarEventos(respuesta);
        res.send(respuesta);
    });
}

function generarInsercionesPresidente(req, res) {
    laMagicaPresidente(function(respuesta) {
        interfisca.insertarEventos(respuesta);
        res.send(respuesta);
    });
}

function obetenerCandidatos(req, res) {
    interfisca.obtenerCandidatosEventos(function(candidatos) {
        if (candidatos) {
            res.send(candidatos);
        } else {
            res.send({ status: 400 });
        }
    });
}

function obetenerPresidente(req, res) {
    interfisca.obtenerPresidenteEventos(function(presidente) {
        if (presidente) {
            res.send(presidente);
        } else {
            res.send({ status: 400 });
        }
    });
}

module.exports = {
    generarInsercionesCandidatos,
    generarInsercionesPresidente,
    obetenerCandidatos,
    obetenerPresidente
};
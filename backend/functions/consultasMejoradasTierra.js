var interfisca = require("../connection/mongo");

function subcategoriasCategoria(categoria) {
    let respuesta = {
        gasto: {},
        conteo: {}
    }
    switch (categoria) {
        case 'fija':
            respuesta['gasto'] = {
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
                'volantes': 0
            };
            respuesta['conteo'] = {
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
                'volantes': 0
            };
            break;

        case 'movil':
            respuesta['gasto'] = {
                'bicicletas,bicitaxis,mototaxis': 0,
                'brigadas': 0,
                'metro': 0,
                'perifoneo': 0,
                'transporte publico': 0,
                'vehiculos particulares': 0,
                'vehiculos publicitarios': 0
            };
            respuesta['conteo'] = {
                'bicicletas,bicitaxis,mototaxis': 0,
                'brigadas': 0,
                'metro': 0,
                'perifoneo': 0,
                'transporte publico': 0,
                'vehiculos particulares': 0,
                'vehiculos publicitarios': 0
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
    let categorias = ['fija', 'movil'];
    let respuesta = {};

    interfisca.consultarTierraEspecial('', '', 4, function(docs) {
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
                            let subcategorias = subcategoriasCategoria(categoria);
                            for (subcategoria of Object.keys(subcategorias.gasto)) {
                                for (i of docs) {
                                    if (i.quienes_aparecen && i.categoria && i.subcategoria && i.partido && i.estado && i.municipio) {
                                        if (i.quienes_aparecen[candidato] && (i.categoria == categoria) && (i.subcategoria == subcategoria) && (i.partido).includes(partido) && (i.estado === estado) && (i.municipio === municipio) && i.precio && i.cantidad) {
                                            subcategorias.gasto[i.subcategoria] += i.precio;
                                            subcategorias.conteo[i.subcategoria] += i.cantidad;
                                            //console.log(candidato + ' ' + partido + '  ' + i.estado + '  ' + i.municipio + '  ' + i.categoria + '  ' + i.subcategoria + '  ' + i.precio + '  ' + i.cantidad);
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
    let categorias = ['fija', 'movil'];
    let candidato = 'presidente';
    let respuesta = {};

    interfisca.consultarTierraEspecial('', '', 4, function(docs) {
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
                        let subcategorias = subcategoriasCategoria(categoria);
                        for (subcategoria of Object.keys(subcategorias.gasto)) {
                            for (i of docs) {
                                if (i.quienes_aparecen && i.categoria && i.subcategoria && i.alianza && i.estado && i.municipio) {
                                    if (i.quienes_aparecen[candidato] && (i.categoria == categoria) && (i.subcategoria == subcategoria) && (i.alianza == alianza) && (i.estado === estado) && (i.municipio === municipio) && i.precio && i.cantidad) {
                                        subcategorias.gasto[i.subcategoria] += i.precio;
                                        subcategorias.conteo[i.subcategoria] += i.cantidad;
                                        //console.log(candidato + ' ' + partido + '  ' + i.estado + '  ' + i.municipio + '  ' + i.categoria + '  ' + i.subcategoria + '  ' + i.precio + '  ' + i.cantidad);
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
        interfisca.insertarTierra(respuesta);
        res.send(respuesta);
    });
}

function generarInsercionesPresidente(req, res) {
    laMagicaPresidente(function(respuesta) {
        interfisca.insertarTierra(respuesta);
        res.send(respuesta);
    });
}

function obetenerCandidatos(req, res) {
    interfisca.obtenerCandidatosTierra(function(candidatos) {
        if (candidatos) {
            res.send(candidatos);
        } else {
            res.send({ status: 400 });
        }
    });
}

function obetenerPresidente(req, res) {
    interfisca.obtenerPresidenteTierra(function(presidente) {
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
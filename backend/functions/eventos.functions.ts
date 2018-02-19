import * as interfisca from '../connect/mongo.connect'; 
import { Response, Request } from 'express';

export let gastoTotal = (req:Request, res:Response): any => {
    let alianza = req.body['alianza'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    let total = 0;

    interfisca.consultarEventoFisca(alianza, persona, categoria, subcategoria, (docs:any) => {
        if (!docs) {
            res.send('');
        }

        for (let i of docs) {
            if (i.precio)
                total += i.precio;
        }
        res.send({ total: total });
    });
}

export let estadosEventos = (req:Request, res:Response):any => {
    let alianza = req.body['alianza'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategoria = req.body['subcategoria'];
    
    let estados = {
        'AGUASCALIENTES': { conteo: 0, gasto: 0},
        'BAJA CALIFORNIA': { conteo: 0, gasto: 0},
        'BAJA CALIFORNIA SUR': { conteo: 0, gasto: 0},
        'CAMPECHE': { conteo: 0, gasto: 0},
        'COAHUILA': { conteo: 0, gasto: 0},
        'COLIMA': { conteo: 0, gasto: 0},
        'CHIAPAS': { conteo: 0, gasto: 0},
        'CHIHUAHUA': { conteo: 0, gasto: 0},
        'CIUDAD DE MÉXICO': { conteo: 0, gasto: 0},
        'DURANGO': { conteo: 0, gasto: 0},
        'GUANAJUATO': { conteo: 0, gasto: 0},
        'GUERRERO': { conteo: 0, gasto: 0},
        'HIDALGO': { conteo: 0, gasto: 0},
        'JALISCO': { conteo: 0, gasto: 0},
        'MÉXICO': { conteo: 0, gasto: 0},
        'MICHOACÁN': { conteo: 0, gasto: 0},
        'MORELOS': { conteo: 0, gasto: 0},
        'NAYARIT': { conteo: 0, gasto: 0},
        'NUEVO LEÓN': { conteo: 0, gasto: 0},
        'OAXACA': { conteo: 0, gasto: 0},
        'PUEBLA': { conteo: 0, gasto: 0},
        'QUERÉTARO': { conteo: 0, gasto: 0},
        'QUINTANA ROO': { conteo: 0, gasto: 0},
        'SAN LUIS POTOSÍ': { conteo: 0, gasto: 0},
        'SINALOA': { conteo: 0, gasto: 0},
        'SONORA': { conteo: 0, gasto: 0},
        'TABASCO': { conteo: 0, gasto: 0},
        'TAMAULIPAS': { conteo: 0, gasto: 0},
        'TLAXCALA': { conteo: 0, gasto: 0},
        'VERACRUZ': { conteo: 0, gasto: 0},
        'YUCATÁN': { conteo: 0, gasto: 0},
        'ZACATECAS': { conteo: 0, gasto: 0}
    };

    interfisca.consultarEventoFisca(alianza, persona, categoria, subcategoria, (docs:any) => {
        if (!docs) {
            res.send('');
        }

        for (let i of docs) {
            if(estados[i.estado]){
                let estado = estados[i.estado];
                estado.conteo += 1;
                if(i.precio){
                    estado.gasto += i.precio;
                }
                estados[i.estado] = estado;
            }    
        }
        res.send({ estados: estados });
    });
}

export let consulta = (req:Request, res:Response):any => {
    var alianza = req.body['alianza'];
    var persona = req.body['persona'];
    var categoria = req.body['categoria'];
    var subcategoria = req.body['subcategoria'];

    interfisca.consultarEventoFisca(alianza, persona, categoria, subcategoria, (docs:any) => {
        if (docs)
            res.send(docs);
        else
            res.send('');
    });
}

export let gastoSubcategorias = (req:Request, res:Response):any =>{
    let alianza = req.body['alianza'];
    let persona = req.body['persona'];
    let categoria = req.body['categoria'];
    let subcategorias:any;
    switch (categoria) {
        case 'estructura':
            subcategorias = {
                'arañas': 0,
                'baños públicos': 0, 
                'carpas': 0,
                'escenario': 0,
                'gradas': 0,
                'mampara': 0, 
                'mesas': 0,
                'otros': 0,
                'sillas': 0,
                'sillones': 0,
                'templete': 0, 
                'vallas': 0
            };
        break;

        case 'animacion':
            subcategorias = {
                'animador/maestro de ceremonias': 0,
                'artistas': 0, 
                'edecanes': 0,
                'grupos musicales / djs': 0,
                'otros': 0
            };
        break;

        case 'transporte':
            subcategorias = {
                'automóviles': 0,
                'camiones': 0, 
                'camionetas': 0,
                'combi/microbus': 0,
                'otros': 0,
                'taxi': 0
            };
        break;

        case 'produccion':
            subcategorias = {
                'computadoras': 0,
                'consola de audio': 0, 
                'cámaras de video': 0,
                'dron': 0,
                'equipo de audio': 0,
                'gruas de cámara': 0, 
                'luces': 0,
                'mermas de producción': 0,
                'micrófonos': 0,
                'otros': 0,
                'pantallas': 0, 
                'personal de seguridad': 0,
                'plantas de luz': 0,
                'proyectores': 0, 
                'servicio médico': 0,
                'video walls': 0
            };
        break;

        case 'espectacular':
            subcategorias = {
                'buzones/cajas de luz': 0,
                'carteleras': 0, 
                'columnas': 0,
                'inflables-promocionales': 0,
                'lonas': 0,
                'marquesinas': 0, 
                'muebles urbanos': 0,
                'muros': 0,
                'otros': 0,
                'panorámicos': 0,
                'parabuses': 0, 
                'pendones': 0,
                'puentes': 0,
                'vallas': 0, 
                'vehículo de transporte': 0
            };
        break;

        case 'utilitario':
            subcategorias = {
                'abanicos': 0,
                'aguas': 0, 
                'banderas': 0,
                'banderines': 0,
                'banderolas': 0,
                'bolsas': 0, 
                'botones': 0,
                'camisas': 0,
                'chaleco': 0,
                'chamarras': 0,
                'cobija': 0, 
                'gallardetes': 0,
                'gorras': 0,
                'impermeable': 0, 
                'lonches': 0,
                'mandiles': 0,
                'mangas': 0,
                'mantas (igual o mayor a 12 mts)': 0, 
                'mantas (menores a 12 mts)': 0,
                'microperforadores': 0,
                'mochilas': 0,
                'otros': 0, 
                'paliacates': 0,
                'playeras': 0,
                'pulseras': 0,
                'refrescos': 0,
                'sombrillas': 0, 
                'stikers': 0,
                'sudadera': 0,
                'tortilleros': 0, 
                'tripticos': 0,
                'vasos': 0,
                'vinilonas': 0,
                'volantes': 0, 
            };
        break;
    }

    for(let subcatego in subcategorias){
        interfisca.consultarEventoFisca(alianza, persona, categoria, subcatego, (docs:any) => {
            if (!docs) {
                res.send('');
            }
            for(let i of docs){
                for (var array of i[categoria]) {
                    if (array.subcategoria === subcatego) {
                        if (array.precio){
                            subcategorias[subcatego] += array.precio;
                        }
                    }
                }
            }
        });
    }
    setTimeout(() =>{
        res.send({ subcategorias: subcategorias }); 
    },5000);
}
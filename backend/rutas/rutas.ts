import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as Eventos from '../functions/eventos.functions';
import * as Tierra from '../functions/tierra.functions';
let api = express.Router();

api.post('/eventos/gastototal', Eventos.gastoTotal);
api.post('/eventos/estadoseventos', Eventos.estadosEventos);
api.post('/eventos/gastosubcategoria', Eventos.gastoSubcategorias);
api.post('/eventos/consulta', Eventos.consulta);

api.post('/tierra/gastototal', Tierra.gastoTotal);
api.post('/tierra/estadostierra', Tierra.estadosEventos);
api.post('/tierra/consulta', Tierra.consulta);

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', api);

export = app;
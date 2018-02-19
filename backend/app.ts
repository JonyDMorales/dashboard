import * as app from './rutas/rutas';

let port = 9000;

app.listen(port, function() {
    console.log('Api REST corriendo en http://localhost:' + port);
});
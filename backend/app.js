var app = require('./Rutas/Rutas.js');

var port = process.env.PORT || 9000;
app.listen(port, function() {
    console.log('Api REST corriendo en http://localhost:' + port);
});
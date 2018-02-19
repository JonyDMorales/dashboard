"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./rutas/rutas");
let port = 9000;
app.listen(port, function () {
    console.log('Api REST corriendo en http://localhost:' + port);
});
//# sourceMappingURL=app.js.map
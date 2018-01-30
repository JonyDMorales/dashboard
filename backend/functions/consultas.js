var interfisca = require("../connection/mongo").interfisca;

function consultarEvento(req, res) {
    interfisca.collection("eventofisca").find(function(err, res) {
        if (err) throw err;
        console.log('mensajito pitero ' + res);
    });
}
const fs = require('fs');
const session = require('express-session');

function contadorVisita(req, res) {
    if (req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas ++;
    res.redirect('/');
}
module.exports = contadorVisita;
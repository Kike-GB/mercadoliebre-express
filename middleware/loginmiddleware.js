const fs = require('fs');
const { send } = require('process');

function loginmiddleware(req, res, next) {
    if (req.query.user == 'admin') {
        next();
    } else {
    res.redirect('/');
    }
}
module.exports = loginmiddleware;
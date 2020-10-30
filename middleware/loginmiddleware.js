const fs = require('fs');
const { send } = require('process');

function loginmiddleware(req, res, next) {
    if (req.query.user == 'admin') {
        console.log(req.query.user)
        next();
    }
    console.log('1', req.query.user)
    res.redirect('/');
}
module.exports = loginmiddleware;
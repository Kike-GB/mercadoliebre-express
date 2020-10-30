const bcrypt = require('bcrypt');
const fs = require('fs')

module.exports = {
    registrarse : (req, res) => {
        res.render('register');
    },
    editar: (req, res, next) => {
        let user = {
            nombreapellido: req.body.nombreapellido,
            nombreusuario: req.body.nombreusuario,
            email: req.body.email,
            fechanacimiento: req.body.fechanacimiento,
            domicilio: req.body.domicilio,
            perfilusuario: req.body.perfilusuario,
            interes: req.body.interes,
            pasword: bcrypt.hashSync(req.body.pasword, 10),
            avatar: 'avatar20201025.jpg',
        };
        console.log('0',user);
        let userArchivo = fs.readFileSync('data/usuarios.json', {encoding: 'utf-8'});
        let usuarios;
        console.log('1',userArchivo);
        if (userArchivo == "") {
            usuarios = [];
        } else {
            usuarios = userArchivo;
        }
        usuarios = usuarios + user;
        console.log('2',usuarios);
        let usuariosJson = JSON.stringify(usuarios);
        console.log('3',usuariosJson);
        fs.writeFileSync('data/usuarios.json', usuariosJson),
        res.redirect('/register/cargadatos');
    },
    cargadatos: (req,res,next) => {
        res.render('cargadatos');
    }
}  
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

const registercontrollers = require('../controllers/registercontrollers');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/fotos');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });

router.get('/', registercontrollers.registrarse);
router.post('/', upload.any(), registercontrollers.editar);
router.get('/cargadatos', registercontrollers.cargadatos);

module.exports = router;
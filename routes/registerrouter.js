var express = require('express');
var router = express.Router();
const registercontrollers = require('../controllers/registercontrollers');


router.get('/', registercontrollers.registrarse);

module.exports = router;
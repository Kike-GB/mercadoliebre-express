var express = require('express');
var router = express.Router();
const logincontrollers = require('../controllers/logincontrollers');

router.get('/', logincontrollers.logearse);

module.exports = router;
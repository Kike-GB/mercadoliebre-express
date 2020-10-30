// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 
router.get('/tiendasoficiales', mainController.tiendas); 
router.get('/ayuda', mainController.ayuda);

module.exports = router;

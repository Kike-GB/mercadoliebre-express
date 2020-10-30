// ************ Require's ************
const express = require('express');
const router = express.Router();
const logmiddleware = require('../../middleware/loginmiddleware');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/detail/:id', productsController.detail)
router.get('/ofertas', productsController.ofertas); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/createproduct', logmiddleware, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;

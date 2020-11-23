// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const logmiddleware = require('../../middleware/loginmiddleware');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/products')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({ storage: storage })


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/detail/:id', productsController.detail)
router.get('/ofertas', productsController.ofertas); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', logmiddleware, productsController.create); 
router.post('/createproduct', upload.any(), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;

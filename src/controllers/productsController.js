const { privateEncrypt } = require('crypto');
const fs = require('fs');
const path = require('path');
const { Recoverable } = require('repl');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		res.render('products', { products });
	},

	// Root - Show discount products
	ofertas: (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		res.render('ofertas', { products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		let product = products[req.params.id-1];
		finalPrice = toThousand(Math.round(product.price / (1 + (product.discount / 100))))
		product.price = toThousand(product.price);
		res.render('detail', { product, finalPrice });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		req.body.price = parseFloat(req.body.price)
		req.body.discount = parseFloat(req.body.discount)
		products.push({
			...req.body,
			id :  products[products.length - 1].id + 1,
			image: req.files[0].filename
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.render('final', {msg: "El producto fue ingresado con éxito." })
	},
	
	// Update - Form to edit
	edit: (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		let ids = req.params.id;
		let product = products[req.params.id-1];
		console.log(product)
		res.render('product-edit-form', { product })
	},

	// Update - Method to update.
	update: (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		let ids = Number(req.params.id) - 1;
		console.log(req.body)
		console.log('2', products[ids].name)
		products[ids].name = req.body.name;
		products[ids].discount = req.body.discount;
		products[ids].description = req.body.description;
		products[ids].category = req.body.category; 
		products[ids].price = req.body.price;
		console.log(products[ids]);
		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.render('final', {msg: "El producto fue modificado con éxito." })
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		var products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
		var imagePath = path.join(__dirname,'../public/images/products/'+products[(Number(req.params.id)-1)].img);
        console.log(imagePath)
        fs.unlink(imagePath, function (err) {
			if (err) throw err;
			console.log('File deleted!');
		})
		products.splice((Number(req.params.id)-1),1)
		let i=1;
		products.forEach(product=>product.id = i++)
		fs.writeFileSync(productsFilePath,JSON.stringify(products))
		res.render('final', {msg: "El producto fue eliminado con éxito." })
	}
};

module.exports = controller;
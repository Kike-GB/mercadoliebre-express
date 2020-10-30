const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products });
	},

	// Root - Show discount products
	ofertas: (req, res) => {
		console.log('ofertas');
		res.render('ofertas', { products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products[req.params.id-1];
		res.render('detail', { product });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		products.push({
			...req.body,
			id :  products[products.length - 1].id + 1
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.render('final')
	},
	
	// Update - Form to edit
	edit: (req, res) => {
		let ids = req.params.id
		res.render('product-edit-form', { products, ids })
	},
	// Update - Method to update.
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		console.log('el producto ' + req.params.id + ' ha sido eliminado')
		res.redirect('/')
	}
};

module.exports = controller;
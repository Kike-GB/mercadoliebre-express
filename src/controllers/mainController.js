const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const tiendasFilePath = path.join(__dirname, '../data/tiendasDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const tiendas = JSON.parse(fs.readFileSync(tiendasFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index', { products });
	},
	search: (req, res) => {
		let data = [...products]
		if (req.query.keywords) {
			data = data.filter((busca) => {
				return busca.name.includes(req.query.keywords)
			})
		}
		res.render('products', { products : data }); 
	},
	tiendas: (req,res) => {
		res.render('tiendas', { tiendas });
	},
	ayuda: (req,res) => {
		res.render('ayuda');
	}
};

module.exports = controller;

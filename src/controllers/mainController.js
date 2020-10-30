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
		let buscar = req.query.keywords
		let datas = [];
		if (req.query.name) {
			let datas = data.filter((product) => {
				return product.name.include(buscar)
			})
		}
		if (req.query.description) {
			let datas = data.filter((product) => {
				return product.description.include(buscar)
			})
		}
		console.log(datas)
		res.render('results', { datas, buscar });
	},
	tiendas: (req,res) => {
		res.render('tiendas', { tiendas });
	},
	ayuda: (req,res) => {
		res.render('ayuda');
	}
};

module.exports = controller;

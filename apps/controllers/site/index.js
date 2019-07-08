const siteModel = require('../../models/site');
const session = require('express-session')
const nodemailer  = require('nodemailer')
async function home(req, res){
	var productFeatured = await siteModel.productFeatured();
	var productLastest = await siteModel.productLastest();
	// console.log(productLastest)
	// console.log(productFeatured)
	res.render('site', {data:{productFeatured:productFeatured, productLastest:productLastest, start:1}});
}
const category = (req, res) =>{
	var cat_id = req.params.cat_id;
	var cat_name = req.params.cat_name
	var products = siteModel.products(cat_id)
	products.then(resolve =>{
		var rows = resolve.length 
		res.render('site/category', {data: {products: resolve, cat_name:cat_name , rows: rows, start:1}})
	})

}

const product = (req, res) =>{
	var prd_id = req.params.prd_id;
	var product = siteModel.product(prd_id);
	product.then(resolve =>{
		res.render('site/product', {data:{product: resolve}})
	})

	
}
const search = (req, res) =>{
	res.render('site/search')
}

async function cart(req, res) {
	let productIdArray = req.session.cart
	let result = await Promise.all(productIdArray.map(item => siteModel.product(item)))
	console.log(result)
	res.render('site/cart', {data:result})
}
const success = (req, res) =>{
	res.render('site/success')
}

const sendMailOder = () =>{
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'lamptit96@gmail.com',
		  pass: 'meyuptrmbhplvsnn'
		}
	  });
	  
	  const mailOptions = {
		from: 'lam hoang',
		to: 'dota2acc19963@gmail.com',
		subject: 'Sending Email using Node.js',
		text: 'That was easy!'
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.json(req.body)
		}
	  });
}

module.exports ={
	home, category, product, search, cart, success, sendMailOder
}
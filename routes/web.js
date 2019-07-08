var adminController = require('../apps/controllers/admin');
var siteController = require('../apps/controllers/site');
var auth = require('../apps/middlewares/auth');
var category = require('../apps/middlewares/site/category')
var session = require('express-session');
var oderMiddleware = require('../apps/middlewares/site/oder.validate')
module.exports = function(app){
	app.group("/", (router) => {
		router.use((req, res, next) =>{
			global.cart = req.session.cart || [];
			next()
		})
		router.use(function(req, res, next){
			
			 category(req, res, next)
		});
		router.get('/', siteController.home);
		router.get('/category/:cat_name/:cat_id', siteController.category);
		router.get('/product/:prd_id', siteController.product);
		router.get('/search', siteController.search);
		router.get('/cart', siteController.cart);
		router.get('/sucess', siteController.success);
		router.get('/cart/:productId', (req, res) =>{
			let productId = req.params.productId;
				
			if(req.session.cart){
				req.session.cart.push(productId)
			}
			else{
				req.session.cart = [productId]
			}
			// global.cart = req.session.cart;
			global.cart = req.session.cart;
			// res.send(`ok, ${req.session.cart}`)
			res.redirect(`/product/${req.params.productId}`)
		})

		router.post('/api/cart/buy', (req, res ) =>{
			res.json(req.body)
		})
	});
	
	app.group("/admin", (router) => {
		
		router.use(function(req, res, next){
			
			return auth.guest(req, res, next);
		});
		
		router.get('/dashboard', adminController.dashboard);
		router.get('/product/list', adminController.productList);
		
		router.get('/product/add', adminController.productGetAdd);
		router.post('/product/add', adminController.productPostAdd);
		
		router.get('/product/edit/:prd_id', adminController.productGetEdit);
		router.post('/product/edit/:prd_id', adminController.productPostEdit);
		
		router.get('/product/del/:prd_id', adminController.productDel);
		
		router.get('/logout', adminController.logout);
		
		router.get('/test1', adminController.test1);
		router.get('/test2', adminController.test2);
	});

	
	
	app.group('/login', (router) => {
		
		router.use(function(req, res, next){
			return auth.check(req, res, next);
		});
		
		router.get('/', adminController.getLogin);
		router.post('/', adminController.postLogin);
	});
}





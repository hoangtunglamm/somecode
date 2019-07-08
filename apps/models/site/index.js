var connection = require('../../../common/database')();


function productFeatured(){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM product WHERE prd_featured = 1 LIMIT 6', function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}

function productLastest(){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM product ORDER BY prd_id DESC LIMIT 6', function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}
function category(){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM category', function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}

function products(cat_id){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM product WHERE cat_id=?', cat_id , function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}

function product(prd_id){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM product WHERE prd_id=?', prd_id, function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}


module.exports = {
	productFeatured, productLastest, category, products, product
}

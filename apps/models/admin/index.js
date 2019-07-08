var connection = require('../../../common/database')();

function login(data){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM user WHERE user_mail=? AND user_pass=?', data, function (error, results, fields) {
			rs(results.length);
		});
	});
	return promise;
}
function productList(per_row, rows_per_page){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM product JOIN category ON product.cat_id=category.cat_id LIMIT '+per_row+', '+rows_per_page, function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}
function totalRows(table){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM '+table, function (error, results, fields) {
			rs(results.length);
		});
	});
	return promise;
}

function categoryList(){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM category', function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}
function add(table, data){
	connection.query('INSERT INTO '+table+' SET ?', data, function (error, results, fields) {
	  
	});
}

function getProductById(prd_id){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM product WHERE prd_id = ?', prd_id, function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}

function productEdit(data){
	connection.query('UPDATE product SET prd_name = ?,prd_price = ?,prd_warranty = ?,prd_accessories = ?,prd_promotion = ?,prd_new = ?,cat_id = ?,prd_status = ?,prd_featured = ?,prd_details = ?, prd_image = ? WHERE prd_id = ?', data, function (error, results, fields) {
		console.log(error);
	});
}

function del(table, key, prd_id){
	connection.query('DELETE FROM '+table+' WHERE '+key+' = ?', prd_id, function (error, results, fields) {
	  
	});
}




function edit(cat){
	connection.query('UPDATE category SET cat_name = ? WHERE cat_id = ?', cat, function (error, results, fields) {
	  
	});
}

function list(){
	var promise = new Promise(function(rs, rj){
		
		connection.query('SELECT * FROM user', function (error, results, fields) {
			rs(results);
		});
	});
	return promise;
}






module.exports = {
	add:add,
	edit:edit,
	del:del,
	list:list,
	login:login,
	productList:productList,
	totalRows:totalRows,
	categoryList:categoryList,
	getProductById:getProductById,
	productEdit:productEdit
}

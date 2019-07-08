var formidable = require('formidable');
var fs = require('fs');
var adminModel = require('../../models/admin');

function getLogin(req, res){
	
	res.render('admin/login', {data:{}});
}
function postLogin(req, res){
	
	var user_mail = req.body.user_mail;
	var user_pass = req.body.user_pass;
	var data = [user_mail, user_pass];
	
	var promise = adminModel.login(data);
	promise.then(function(rs){
		
		if(rs > 0){
			req.session.user_mail = user_mail;
			res.redirect('/admin/dashboard');
		}
		else{
			var error = 'Tài khoản không hợp lệ !';
			res.render('admin/login', {data:{error:error}});
		}
	});
}

function logout(req, res){
	
	req.session.destroy();
	res.redirect('/login');
}

function dashboard(req, res){
	
	res.render('admin/dashboard');
}
function productList(req, res){
	
	var page, per_row, rows_per_page;
	if(req.query.page){
		page = parseInt(req.query.page);
	}
	else{
		page = 1;
	}
	rows_per_page = 5;
	per_row = page*rows_per_page-rows_per_page;
	
	var promise = adminModel.productList(per_row, rows_per_page);
	promise.then(function(rs){
		
		var total_rows = adminModel.totalRows('product');
		total_rows.then(function(rs2){
			
			var number_page = Math.ceil(rs2/rows_per_page);	
			var page_prev, page_next;
			page_prev = page - 1;
			if(page_prev == 0){
				page_prev = 1;
			}
			page_next = page + 1;
			if(page_next > number_page){
				page_next = number_page;
			}
			
			res.render('admin/product', {data:{products:rs, number_page:number_page, page_prev:page_prev, page_next:page_next}});
		});
	});
}

function productGetAdd(req, res){
	
	var promise = adminModel.categoryList();
	promise.then(function(rs){
		
		res.render('admin/add_product', {data:{categories:rs}});
	});
}
function productPostAdd(req, res){
	
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		
		var prd_image = files.prd_image.name;
		var old_path = files.prd_image.path;
		var new_path = '../public/images/products/'+prd_image;
		var data = fields;
		delete data.sbm;
		data.prd_image = prd_image;
		
		fs.rename(old_path, new_path, function(err){
			
		});
		
		adminModel.add('product', data);
		res.redirect('/admin/product/list');
	});
}

function productGetEdit(req, res){
	
	var prd_id = req.params.prd_id
	var promise = adminModel.getProductById(prd_id);
	promise.then(function(rs){
		
		var categoryList = adminModel.categoryList();
		categoryList.then(function(rs2){
			
			res.render('admin/edit_product', {data:{product:rs, categories:rs2}});
		});
	});
}
function productPostEdit(req, res){
	
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		
		var data = fields;
		
		if(files.prd_image.name){
			var prd_image = files.prd_image.name;
			var old_path = files.prd_image.path;
			var new_path = '../public/images/products/'+prd_image;
			
			fs.rename(old_path, new_path, function(err){
			
			});
			data.prd_image = prd_image;
		}
		else{
			data.prd_image = fields.prd_image_hidden;
		}
		data.prd_id = req.params.prd_id;
		delete data.sbm;
		delete data.prd_image_hidden;
		//console.log(Object.values(data));
		
		adminModel.productEdit(Object.values(data));
		res.redirect('/admin/product/list');
	});
}

function productDel(req, res){
	
	var prd_id = req.params.prd_id;
	var table = 'product';
	var key = 'prd_id';
	adminModel.del(table, key, prd_id);	
	res.redirect('/admin/product/list');
}

//test
function test1(req,res){

	req.session.user_mail = "admin@gmail.com";
	res.send('Session defined');

}
function test2(req,res){
	
	//var someAttribute = req.session.user_mail;
    console.log(req.session.user_mail);
    //res.send(`This will print the attribute I set earlier: ${someAttribute}`);
}


module.exports = {
	getLogin:getLogin,
	postLogin:postLogin,
	dashboard:dashboard,
	productList:productList,
	productGetAdd:productGetAdd,
	productPostAdd:productPostAdd,
	productGetEdit:productGetEdit,
	productPostEdit:productPostEdit,
	productDel:productDel,
	productGetEdit:productGetEdit,
	productPostEdit:productPostEdit,
	logout:logout,
	
	test1:test1,
	test2:test2
}
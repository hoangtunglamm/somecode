var mysql      = require('mysql');

function connection(){
	
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'vietpro_mobile_shop'
	});
	 
	connection.connect();
	
	return connection;
}

module.exports = connection;
var mysql = require('mysql');

exports.init = function(callback) {
	console.log("Initialising module connection");
	var connection = mysql.createConnection({
	  host: 'localhost',
		port: 3306,
		database: 'training',
		user: 'root'
	});
	connection.connect();
	callback(connection);
};

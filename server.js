var path = require('path')
var express = require('express');
var app = express();

app.use(express.urlencoded())
//making static assets
app.use(express.static("public"));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'subs_and_users_db'
});
 
connection.connect();
 
// app.get('/users', function(req, res){
// 	connection.query('SELECT * FROM users ORDER BY id DESC', function (error, results, fields) {
// 	  if (error) res.send(error)
// 	  else res.json(results);
// 	});
// });

// app.post('/insert', function(req, res){
// 	// res.json(req.query);

// 	if (req.body.full_name.length > 1){
// 		connection.query('INSERT INTO users (full_name, user_name, email_e, pass_d) VALUES (?, ?, ?, ?)', [req.body.full_name, req.body.user_name, req.body.email_e, req.body.pass_d], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid name')
// 	}
// });

app.post('/signup', function(req, res){
	console.log(req.body)

	connection.query('INSERT INTO users (full_name, user_name, email_e, pass_d) VALUES (?, ?, ?, ?)',
		[req.body.full_name, req.body.user_name, req.body.email_e, req.body.pass_d],
		function(error, results){
			if (error) return res.send(error)

			res.sendFile(path.join(__dirname,"protected/homepage.html"))

		}
	)

})

app.post('/login', function(req, res){
	console.log(req.body)

	connection.query('SELECT * FROM users WHERE user_name=? and pass_d=?',
		[req.body.user_name, req.body.pass_d],
		function(error, results){
			if (error) return res.send(error)

			if (results.length == 1) {

				res.sendFile(path.join(__dirname,"protected/homepage.html"))
			} else {
				
				res.redirect('/login.html')
			}

		}
	)

})


var port = process.env.PORT || 3000;


app.listen(port, function(){
	console.log("listening on 3000");
});
var path = require('path')
var express = require('express');
var app = express();

var methodOverride = require('method-override')

//we do this because we want PUT and DELETE methods for our routes
	//integrate method override with express
	// override with POST having ?_method=DELETE
		app.use(methodOverride('_method'))


app.use(express.urlencoded({extended : false}))
//making static assets
app.use(express.static("public"));




var mysql      = require('mysql');
var connection = mysql.createConnection(
	process.env.JAWSDB_URL || 
	{
	  host     : 'localhost',
	  user     : 'root',
	  password : 'password',
	  database : 'subs_and_users_db'
	}
);
 
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

app.post('/addsub', function(req, res){
	console.log(req.body)

	connection.query('INSERT INTO userssub (user_s) VALUES (?)',
		[req.body.user_s],
		function(error, results){
			if (error) return res.send(error)

			res.sendFile(path.join(__dirname,"public/mysub.html"))

		}
	)

})

app.delete('/delete', function(req, res){
	// res.json(req.body);

	if (req.body.id){
		// ; DELETE FROM people;
		// '1 AND DELETE FROM people'
		connection.query('DELETE FROM userssub WHERE id = ?', [req.body.id], function (error, results, fields) {
		  if (error) res.send(error)
		  else res.redirect('/mysub.html');
		});
	}else{
		res.send('you need an id')
	}
});


app.get('/userssub', function(req, res){
	connection.query('SELECT * FROM userssub ORDER BY id DESC', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

app.post('/login', function(req, res){
	console.log(req.body)

	// if (req.body.user_name = )

	connection.query('SELECT * FROM users WHERE user_name=? and pass_d=?',
		[req.body.user_name, req.body.pass_d],
		function(error, results){
			if (error) return res.send(error)

			console.log(results)

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
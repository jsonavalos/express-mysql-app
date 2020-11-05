var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'join_us'   // the name of your db
});



app.get("/", function(req, res){
 var q = 'SELECT COUNT(*) as count FROM users';
 connection.query(q, function (error, results) {
 if (error) throw error;
 var count2 = results[0].count;
 res.render("home",{count: count2});
 });
});


app.get("/joke",function(req,res){
	res.send("What time is it in China? --Joke");
});

app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.post("/register",function(req,res){
	var q = 'INSERT INTO users(email) VALUES ("'+req.body.email+'")';
	console.log(q);
	connection.query(q,function(err,results){
		if(err) throw err;
		res.redirect("/");
	});

	
});

app.listen(3001,function(){
	console.log("Listening Port 3001");
});

var express		= require('express');
var app 		= express();
var port 		= process.env.PORT || 8080;
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var body 		= require('body-parser');
var router 		= express.Router();
var appRoutes 	= require('./app/Routes/api')(router);
var path 		= require('path');
var serveStatic = require('serve-static');

app.use(morgan('dev'));
app.use(body.json());//for parsing application/json
app.use(body.urlencoded({extended: false}));//for parsing application/x-ww-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(serveStatic(__dirname, {'index': ['home.html', 'about.html']}))
app.use('/api',appRoutes);

//http:localhost:8080/api/users
mongoose.connect('mongodb://localhost:27017/tutorialmeanstack', { 
	useMongoClient: true ,
	function(err){
if(err){
	console.log("Not conected to the databasee  "+err);
}
else{
	console.log("Successfull connected to database");
}


}
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port ,function(){
	console.log("Running the server on port " + port);
});
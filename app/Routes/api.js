var User  		= require('../models/users');
var jwt 		=require('jsonwebtoken');
var secret 		='harrypotter';
module.exports =function(router){
	// user registration ROUTE
	router.post('/users',function(req,res){
	// res.send("testing users route");
	var user=new User();
	user.username= req.body.username; 
	user.password= req.body.password;
	user.email =req.body.email;
	if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
		// res.send("Ensure username, email and password weere provided !!");
		res.json({success:false,message:'Ensure username, email and password weere provided !!'});
	} else {
		user.save(function(err) {
		if(err){
			// res.send("Username or Email already exist");
			res.json({success: false, message:'Username or Email already exist !!'});
		}
		else {
			// res.send("user created");
			res.json({success: true,message:'User Created !!' });
		}
	});
	}

});
	//router.get('/home');
	//user login Route
	//http://localhost:8080/api/authenticate
	router.post('/authenticate',function(req,res){
		User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
			if(err) throw err;

			if(!user){
				res.json({ success: false, message : 'Could NOT authenticate user !!!' });
			} else if (user) {
				if(req.body.password) {
						var validPassword=user.comparePassword(req.body.password);
					} else {
						res.json({ success: false, message: 'No password provided !!'});
					}
				if(!validPassword) {
					res.json({ success : false, message: 'Could NOT authenticate the password'});
				} else {
					var token=jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'});
			
					res.json({ success: true, message : 'User authenticated !', token: token});
				}
			}

		});
	});
		router.use(function(req, res, next) {
			
			var token= req.body.token || req.body.query || req.headers['x-access-token'];
			if(token) {
				//verify token
				jwt.verify(token,secret,function(err,decoded){
					if(err) {
						res.json({ success: false, message:'Token invalid'});
					} else {
						req.decoded=decoded;
						next();
					}
				});
			} else {
				res.json({ success : false , message : 'No token provided'});
			}

		});

	router.post('/me',function(req,res){
		res.send(req.decoded);
	});
return router;
}
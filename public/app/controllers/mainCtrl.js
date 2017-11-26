angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout, $location, $rootScope){
	var app = this;
	$rootScope.$on('$routeChangeStart', function() {
		if(Auth.isLoggedIn()){
			
			app.isLoggedIn= true;
			Auth.getUser().then(function(data){
				
				app.username=data.data.username;
				app.useremail=data.data.email;

				
			});
			} else {
				
				app.isLoggedIn= false;
				app.username='';
				}
	});
	
	app.doLogin=function(loginData){
		var loading=true;
		app.errorMsg=false;
		app.successMsg=false;
		// Factory Service http post
		Auth.login(app.loginData).then(function(data){
			
			if(data.data.success){
				app.loading=false;
				app.successMsg=data.data.message + " ... redirecting";
				$timeout(function() {
					console.log("2000");
					$location.path('/about');
					app.loginData='';
					app.successMsg=false;
					
				}, 2000);
				
			}else {
				app.loading=false;

				app.errorMsg=data.data.message;
			}
		});
	};
	this.logout=function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},2000);
	};
});
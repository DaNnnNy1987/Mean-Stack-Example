angular.module('userControllers', ['userServices'])

.controller('regCtrl',function($http, $location, $timeout, User){
 var app= this;
	app.regUser=function(regData){
		var loading=true;
		app.errorMsg=false;
		app.successMsg=false;
		// Factory Service http post
		User.create(app.regData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.message);
			if(data.data.success){
				app.loading=false;
				app.successMsg=data.data.message + " ... redirecting";
				$timeout(function() {
					console.log("2000");
					$location.path('/home');
					
				}, 2000);
				
			}else {
				app.loading=false;

				app.errorMsg=data.data.message;
			}
		});

		// Simple http
		// $http.post('/api/users',app.regData).then(function(data){
		// 	console.log(data.data.success);
		// 	console.log(data.data.message);
		// 	if(data.data.success){
		// 		app.loading=false;
		// 		app.successMsg=data.data.message + " ... redirecting";
		// 		$timeout(function() {
		// 			console.log("3000");
		// 			$location.path('/');
					
		// 		}, 3000);
				
		// 	}else {
		// 		app.loading=false;

		// 		app.errorMsg=data.data.message;
		// 	}
		// });

	};
});

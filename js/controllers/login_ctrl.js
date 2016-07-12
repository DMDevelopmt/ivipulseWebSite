//création du contrôleur "login_ctrl"
app.controller("login_ctrl", function ($scope, $http, $rootScope, $location, $cookies, me) {
	
	console.log("LoginCtrl initialized");

	$scope.user = {};

	$scope.loggedIn = !!$rootScope.globals.currentUser;

	var init = function() {
		var req = {
        		method: 'GET',
        		url: ROOT_URL + "/users/me",
		        headers: {
		        	token: $rootScope.globals.currentUser.token
			    }
        	};

        	$http.defaults.headers.token = $rootScope.globals.currentUser.token;
        	$http(req)
        	.success(function(user) {
        		console.log("login_ctrl, user = " , $scope.user);
        		$scope.user = user;
        		
        	})
	};

	init();

	


	/**
	 * La méthode email_login permet à un utilisateur de 
	 * se connecter via email.
	 * Elle fait appel à la fonction login de la factory 'me'
	 * @return {[type]}
	 */
	$scope.email_login = function () {

	//appel de la fonction login de la factory "me"
	me.login($scope.user.mail, $scope.user.password)
	//1er callback, s'exécute lorsque la méthode me.login
	//a terminé son exécution
	.then(function(user) {
		//stocke l'objet user renvoyé par la factory dans le scope
		$rootScope.user = user;
		$scope.loggedIn = true;
		$scope.err.message = null;
      	//console.log("user_name : " + user.first_name);
			$location.path('/store');
	})
	.catch(function(err) {
		$scope.err.message = err;
	});
	
	}

	$scope.email_signin = function () {

		console.log("password : " + $scope.user.password);
		console.log("password_check : " + $scope.password_check);
		//on vérifie la correspondance des mots de passe
		if($scope.user.password !== $scope.password_check) {
			$scope.err.message = "Les mots de passe de sont pas identiques";
		}

		else {
			me.signin($scope.user.mail, $scope.user.password)
  		//1er callback, s'exécute lorsque la méthode me.login
  		//a terminé son exécution
  		.then(function(res) {
  			//stocke l'objet renvoyé par la factory dans le scope
  			$scope.user = res;
  			$scope.err.message = null;
  			$location.path("/signin");
  		})
      //récupération du message d'erreur
  		.catch(function(err) {
  			$scope.err.message = err;
  		});
		}
	};

	$scope.logout = function () {
		$scope.loggedIn = false;
		$rootScope.globals = {};
		$cookies.remove('globals');
		$http.defaults.headers.token = '';
	}
});
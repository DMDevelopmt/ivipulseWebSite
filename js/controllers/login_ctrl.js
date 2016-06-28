//création du contrôleur "login_ctrl"
app.controller("login_ctrl", function ($scope, me) {
	
	console.log("LoginCtrl initialized");

	$scope.user = {};
	$scope.password_check = "";
	$scope.err = {
		message: ""
	};
	$scope.state = {
		mode: "connexion"
	};


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
		.then(function(res) {
			//stocke l'objet user renvoyé par la factory dans le scope
			$scope.user = res;
			$scope.err.message = null;
      console.log("user_name : " + res.email);
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
  		})
      //récupération du message d'erreur
  		.catch(function(err) {
  			$scope.err.message = err;
  		});
		}
		
	}

});
//création du contrôleur "login_ctrl"
app.controller("main_ctrl", function ($scope, $location, me) {

	console.log("MainCtrl initialized");

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
      		$location.path("/logged");
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
	}
	/**
	 * La méthode update permet de mettre à jour
	 * les infos .
	 * Elle fait appel à la fonction update de la factory 'me'
	 * 
	 */
	$scope.update= function(){

		//appel de la fonction update de la factory "me"
		 me.update($scope.user)
		 //1er callback, s'exécute lorsque la méthode me.update
		//a terminé son exécution
		 .then(function(res) {
			//stocke l'objet tmp_user renvoyé par la factory dans le scope
			scope.user = res;
			$scope.err.message = null;
			console.log("user_name : " + res.user_name);
			$location.path("/signin");
		})
		.catch(function(err) {
			$scope.err.message = err;
		});
	}

});
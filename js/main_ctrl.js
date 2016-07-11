//création du contrôleur "login_ctrl"
app.controller("main_ctrl", function ($scope, $rootScope, $location, me, Cards) {

	console.log("MainCtrl initialized");

	$scope.user = $rootScope.globals.currentUser || {};
	$scope.password_check = "";
	$scope.err = {
		message: ""
	};
	
	$scope.state = {
		mode: "connexion"
	};

	
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
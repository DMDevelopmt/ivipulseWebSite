//création du contrôleur "login_ctrl"
app.controller("main_ctrl", function ($scope, $rootScope, $location, me, Cards) {

	console.log("MainCtrl initialized");

	//$scope.user = $rootScope.user || {};
	$scope.password_check = "";
	$scope.err = {
		message: ""
	};
	
	$scope.state = {
		mode: "connexion"
	};

	

/*
	$scope.ajouter = function(){
		var fichier = document.getElementById('fichier').files[0],
		var lecture = new FileReader();
		lecture.onloadend = function(evenement){
		var donnees = evenement.target.result;
		//Traitez ici vos données binaires. Vous pouvez par exemple les envoyer à un autre niveau du framework avec $http ou $ressource
		}
		lecture.readAsBinaryString(fichier);
		}*/

});
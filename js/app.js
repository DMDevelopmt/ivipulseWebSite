//déclaration du module principal l'application
//le premier paramètre définit le nom du module, le second
//les dépendances utilisées
var app = angular.module("ivipulse", [
	// Dépendances du module
	'ngRoute'
]);


app.config(['$routeProvider', function($routeProvider) {

	//système de routage
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'main_ctrl'
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'login_ctrl'
	})
	.otherwise({
		redirectTo: '/'
	});
	
}]);


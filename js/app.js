//déclaration du module principal l'application
//le premier paramètre définit le nom du module, le second
//les dépendances utilisées
var app = angular.module("ivipulse", [ 
  // Dépendances du module 
  'ngRoute' 
]);

var ROOT_URL = 'http://192.168.1.3:8080';

app.config(['$routeProvider', function($routeProvider) {

	//système de routage
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html'
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'login_ctrl'
	})
	.when('/signin', {
		templateUrl: 'partials/signin.html'
		
	})
	.when('/logged', {
		templateUrl: 'partials/logged.html'
	})
	.when('/shop', {
		templateUrl: 'partials/shop.html',
		controller: 'shop_ctrl'
	})
	.when('/home', {
		templateUrl: 'partials/home.html'
	})
	.when('/personnaliserCarte',{
		templateUrl:'partials/personnaliserCarte'
	})
	.when('/store',{
		templateUrl:'partials/store',
		controller: 'store_ctrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);


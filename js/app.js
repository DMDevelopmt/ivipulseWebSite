//déclaration du module principal l'application
//le premier paramètre définit le nom du module, le second
//les dépendances utilisées
var app = angular.module("ivipulse", [ 
  // Dépendances du module 
  'ngRoute',
  'ngCookies',
  'mgcrea.ngStrap'
]);

var ROOT_URL = 'http://192.168.1.3:8180';

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
	.when('/helpSocial', {
		templateUrl: 'partials/helpSocial.html'
	})
	.when('/test', {
		templateUrl: 'partials/test.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

app.run(['$rootScope', '$location', '$cookies', '$http',
    function ($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        console.log("Dans app.run()");

        $rootScope.globals = $cookies.getObject('globals') || {};

        console.log("rootScope.globals : ", $rootScope.globals);
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.token = $rootScope.globals.currentUser.token;
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
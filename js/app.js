//déclaration du module principal l'application
//le premier paramètre définit le nom du module, le second
//les dépendances utilisées
var app = angular.module("ivipulse", [ 
  // Dépendances du module 
  'ngRoute' 
]);

var ROOT_URL = 'http://192.168.1.21:8180';

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
		templateUrl: 'partials/signin.html',
		controller: 'login_ctrl'
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
		templateUrl:'partials/personnaliserCarte',
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

/**
 * Ce run permet de récupérer les données du user depuis le cookie vers le rootScope.
 * Si le cookie est vide, redirige vers login.
 * 
 * @param  {[type]} $rootScope [description]
 * @param  {[type]} $location  [description]
 * @param  {[type]} $cookies   [description]
 * @param  {[type]} $http)
 * @return {[type]}            [description]
 */
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
            if (!$rootScope.globals.currentUser && $location.path() !== '/login') {
                $location.path('/login');
            }
        });
    }]);
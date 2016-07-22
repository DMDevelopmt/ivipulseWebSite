//création du contrôleur "main_ctrl"
app.controller("main_ctrl", function ($scope, $rootScope, $http, $location,  $aside,  Cards) {

	console.log("MainCtrl initialized");
	//déclaration et initialisation des variables
	console.log("cookie : ", $rootScope.globals.currentUser.first_name);
	$scope.user = $rootScope.user || {};
	$scope.err = {
		message: ""
	};
	$scope.state = {
		mode: "connexion"
	};
	$scope.contacts_filter = "";
	$scope.aside = {
	  "title": "Title"
	};
	$scope.asideLogin = {
	  "title": "Title"
	};

	$scope.cards = {};


	/**
     * [init description]
     * @return {[type]} [description]
     */
    var init = function() {

        if($rootScope.globals.currentUser){
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
                console.log("user.avatar : ", user.avatar);
                $scope.user = user;
                
            })
        }       
    };

    init();

	/**
	 * Cette fonction permet d'initialiser la liste des contacts de l'utilisateur
	 */
	var refresh_cards = function() {
		//appel de la factory Cards pour effectuer
		// la requête fournissant les contacts
		Cards.acceptedCards()
		.then (function(cards){
			$scope.cards = cards;
		});
	};
	//appel de la fonction
	refresh_cards();

});
//création du contrôleur "login_ctrl"
app.controller("main_ctrl", function ($scope, $rootScope, $location,  $aside, me, Cards) {

	console.log("MainCtrl initialized");

	//$scope.user = $rootScope.user || {};
	$scope.password_check = "";
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

	var refresh_cards = function() {
		Cards.acceptedCards()
		.then (function(cards){
			$scope.cards = cards;
		});
	};

	refresh_cards();
	

	$scope.filterFunction = function (card) {
		//console.log("filtre : " + $scope.contacts_filter);
		//console.log(card._sender.first_name.includes($scope.contacts_filter));
		return card._sender.first_name.includes('a');
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

/*// Show a basic aside from a controller
  var myAside = $aside({title: 'My Title', content: 'My Content', show: true});

  // Pre-fetch an external template populated with a custom scope
  var myOtherAside = $aside({scope: $scope, template: 'aside/docs/aside.demo.tpl.html'});
  // Show when some event occurs (use $promise property to ensure the template has been loaded)
  myOtherAside.$promise.then(function() {
    myOtherAside.show();
  });*/
/*
$scope.searchContact = function(){

};*/
//création du contrôleur "login_ctrl"
app.controller("main_ctrl", function ($scope, $rootScope, $location,  $aside, me, Cards) {

	console.log("MainCtrl initialized");

	//$scope.user = $rootScope.user || {};
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
	

	$scope.filterFunction = function (card, contacts_filter) {
		//console.log("filtre : " + $scope.contacts_filter);
		//console.log(card._sender.first_name.includes($scope.contacts_filter));
		/*
		cards.forEach(function(card, i, cards){
			if (card._sender.first_name.includes($scope.contacts_filter) ||
						card._sender.last_name.includes($scope.contacts_filter)){
				return true;
			}
			else {
				return false;
			}
		});*/

		//console.log("filterFunction ", card);
		console.log("filterFunction ", contacts_filter);
		return card._sender.first_name.includes(contacts_filter);
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
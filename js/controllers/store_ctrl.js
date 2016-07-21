//création du contrôleur "store_ctrl"
app.controller("store_ctrl", function ($scope, $routeParams, Cards) {
	
	console.log("StoreCtrl initialized");

	$scope.cards = {};

	Cards.acceptedCards()
	.then(function(res) {
		$scope.cards = res;
	});

	$scope.selectContact = function(card) {
		$scope.card = card;
	};

});


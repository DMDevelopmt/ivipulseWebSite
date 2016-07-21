//création du contrôleur "store_ctrl"
app.controller("store_ctrl", function ($scope, $routeParams, $alert, $sce, Cards) {
	
	console.log("StoreCtrl initialized");

	$scope.cards = {};
	$scope.card = {};

	$scope.message = {};


	var refreshCards = function(){
		Cards.acceptedCards()
		.then(function(res) {
		$scope.cards = res;
		$scope.card = $scope.cards[0];

	});
	};

	refreshCards();
	

	$scope.selectContact = function(card) {
		$scope.card = card;
	};

	$scope.deleteContact = function(contact_id){
		Cards.decline(contact_id)
		.then(function(){
			console.log("StoreCtrl : deleteContact, success, id = ", contact_id);
			refreshCards();
			$scope.message.delete = "Carte supprimée";
		})
		.error(function(){
			$scope.message.delete = "Erreur de suppression";
		});
	};
});


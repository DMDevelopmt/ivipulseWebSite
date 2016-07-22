//création du contrôleur "store_ctrl"
app.controller("store_ctrl", function ($scope, $routeParams, $alert, $sce, Cards) {
	
	console.log("StoreCtrl initialized");
	//liste des contacts
	$scope.cards = {};
	//contact sélectionné
	$scope.card = $scope.$parent.cards[0] || {};

	$scope.message = {};
	
	/**
	 * Cette fonction permet de définir le contact sélectionné
	 * @param  card : contact sélectonné
	 */
	$scope.selectContact = function(card) {
		$scope.card = card;
	};

	/**
	 * Cette fonction permet de supprimer un contact
	 * @param contact_id : Identifiant du contact à supprimer
	 */

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


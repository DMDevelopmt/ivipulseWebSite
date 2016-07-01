
app.controller('shop_ctrl', function ($scope, shop_facto){
	$scope.fondCards = {};
	$scope.selectedIcon = true;
	$scope.metier = [];



	shop_facto.listFonds
	.then(function(res) {
		$scope.fondCards = res;
		console.log("fondCards reçues");
	 });
});


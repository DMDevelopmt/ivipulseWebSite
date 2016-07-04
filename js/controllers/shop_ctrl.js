
app.controller('shop_ctrl', function ($scope, shop_facto){
	$scope.fondCards = {};
	$scope.selectedIcon = true;
	$scope.metier = [];
	$scope.contactEmail = false;

	shop_facto.listFonds
	.then(function(res) {
		$scope.fondCards = res;
		console.log("fondCards reçues");
	 });

	$scope.count = 0;
    $scope.comptCarte = function() {
        $scope.count++;
    };
});


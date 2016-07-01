
app.controller('shop_ctrl', function ($scope, shop_facto){
	$scope.fondCards = {};
	$scope.selectedIcon = false;
	$scope.metier = [];

	shop_facto.listFonds
	.then(function(res) {
		$scope.fondCards = res;
		console.log("fondCards reçues");
	 });

	$scope.count = 0;
    $scope.comptCarte = function() {
    	if(!$scope.selectedIcon){
    		$scope.count++;
    	}
    	else{
    		$scope.count--;
    	}
    	console.log($scope.selectedIcon);
    };
});


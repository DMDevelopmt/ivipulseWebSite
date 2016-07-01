
app.controller('shop_ctrl', function ($scope, shop){
	$scope.fondCards = {};
	$scope.metier = ['infermier','yoga'];

	shop.listFonds
	.then(function(res) {
		$scope.fondCards = res;
	 });
});
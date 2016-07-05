
app.controller('shop_ctrl', function ($scope, shop_facto){
	$scope.fondCards = {};
	$scope.selectedIcon = true;
	$scope.fondAAjoute = [];


    $scope.textAjoute = function(){
        return $scope.fondAAjoute.length > 1;
    }

	$scope.isAdded = function(fond){
        return $scope.fondAAjoute.indexOf(fond) != -1;
    }


	shop_facto.listFonds
	.then(function(res) {
		$scope.fondCards = res;
		console.log("fondCards reçues");
	 });


    $scope.ajouteFond = function(template){
        console.log("template : " + template);
    	console.log("fond present : " + $scope.isAdded(template));
    	

    	if(!$scope.isAdded(template)){
    		$scope.fondAAjoute.push(template);
            console.log("fond present if : " + $scope.isAdded(template));
    	}
    	else{
    		var indexOf = $scope.fondAAjoute.indexOf(template);
    		$scope.fondAAjoute.splice(indexOf,1);
    	}
    	console.log("length :"+ $scope.fondAAjoute.length);
    	console.log("index ajouteFond:" + indexOf);

    };
    
});


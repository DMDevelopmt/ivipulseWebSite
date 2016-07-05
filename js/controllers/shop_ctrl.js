
app.controller('shop_ctrl', function ($scope, shop_facto){
	$scope.fondCards = {};
	$scope.selectedIcon = true;
	$scope.fondAAjoute = [];

    /**
    retourne vrai si le nombre de fond de carte est superieur a 1;
    */
    $scope.textAjoute = function(){
        return $scope.fondAAjoute.length > 1;
    }

    /**
    retourne le fond est vrai ou faut 
    */
	$scope.isAdded = function(fond){
        return $scope.fondAAjoute.indexOf(fond) != -1;
    }


    /**
    envoie la liste de fond de carte existe dans le base de donnee
    */
	shop_facto.listFonds
	.then(function(res) {
		$scope.fondCards = res;
		console.log("fondCards reçues");
	 });


    /**
    envoie la quantite de carte selectione
    */
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


    $scope.envoiText = function(textNom,textPrenom,textEmail,textNumero,textMessage){
        return $scope.textNom; $scope.textPrenom; $scope.textEmail;
    }
    
});


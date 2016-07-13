
app.controller('shop_ctrl', function ($scope, shop_facto,$http, me){
	$scope.fondCards = {};
    $scope.listCards = {};
	$scope.selectedIcon = true;
	$scope.fondAAjoute = [];
    $scope.currentTemplate = {};
    $scope.getCredits = {};
    $scope.resteCredits = {};

    $scope.filter = "all";

    $scope.formule = "";



    $scope.categories = {
    all: 'Tous métiers',
    graphic: 'Design',
    pro: 'Professionnel',
    metal: 'Métal',
    wood: 'Bois',
    animaux: 'Nature',
    cartoon: 'Cartoon',
    netb: 'Noir et blanc',
    bleu: 'Bleu',
    marron: 'Marron',
    rouge: 'Rouge'
    };


    /**
    retourne le choix de combobox
    */
    $scope.comboFilter = function(){
        switch($scope.filter){
            case "all":
            $scope.listCards = _.chain($scope.fondCards).values().flatten().value().reverse();
            break;

            default:
            $scope.listCards = $scope.fondCards[$scope.filter];

            console.log($scope.listCards);
        }
    };

    $scope.$watch("filter", function(new_value, old_value) {
        $scope.comboFilter(new_value);
    });


    /**
    retourne vrai si le nombre de fond de carte est superieur a 1;
    */
    $scope.textAjoute = function(){
        return $scope.fondAAjoute.length > 1;
    };

    /**
    retourne le fond est vrai ou faut 
    */
	$scope.isAdded = function(fond){
        return $scope.fondAAjoute.indexOf(fond) != -1;
    };


    /**
    envoie la liste de fond de carte existe dans le base de donnee
    */
    var shopListFonds = function(){
    	shop_facto.listFonds
    	.then(function(res) {
    		$scope.fondCards = res;
            $scope.listCards = _.chain($scope.fondCards).values().flatten().value();
    		console.log($scope.fondCards);
         });
    };

    shopListFonds();

    /**
    retourne le reste de crédit après l'achat de carte
    */
    $scope.calculCredits = function(){
        getCreditF();
        if($scope.getCredits < $scope.fondAAjoute.length){
            $scope.err.message = " Credit insuffisant";
        }
        else{
            $scope.resteCredits = $scope.getCredits - $scope.fondAAjoute.length;
        }
        console.log("resteCredits :", $scope.resteCredits);
    };


    /**
    retourne le crédit que l'user procède
    */
    var getCreditF = function(){
        me.get_credit
        .then(function(res) {
            $scope.getCredits = res;
            console.log($scope.getCredits);
        });
    };

    


    /**
    retourne le     */

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


    /**

    */
    $scope.setCurrentTemplate = function(template){
        $scope.currentTemplate = template;
    };

});


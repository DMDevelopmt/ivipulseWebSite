
app.controller('shop_ctrl', function ($scope, shop_facto,$http, $rootScope, me){

    $scope.user = {};
	$scope.fondCards = {};
    $scope.listCards = {};
	$scope.selectedIcon = true;
	$scope.fondAAjoute = [];
    $scope.currentTemplate = {};
    $scope.achat = true;
    $scope.achatCredits = true;
    $scope.prix = null;
    $scope.avatar = {};
    $scope.fondAAcheter = [];

    $scope.filter = "all";


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

    var init = function() {

        if($rootScope.globals.currentUser){
            var req = {
                method: 'GET',
                url: ROOT_URL + "/users/me",
                headers: {
                    token: $rootScope.globals.currentUser.token
                }
            };

            $http.defaults.headers.token = $rootScope.globals.currentUser.token;
            $http(req)
            .success(function(user) {
                console.log("login_ctrl, user = " , $scope.user);
                console.log("user.avatar : ", user.avatar);
                $scope.user = user;
                $scope.fondAAcheter = user.premium_cards;
                
            })
        }       
    };

    init();

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
    cette fonction permet de calculer le prix total en euro pour l'achat 
    de carte choisie
    */

    $scope.calculPrix = function(){
        console.log("currentUser ", $rootScope.globals.currentUser);
        getCardShared();
        $scope.achat = true;

        if($scope.fondAAjoute.length == 1)
        {
            $scope.prix = 1.99;
        }
        else if($scope.fondAAjoute.length > 5) {
            $scope.prix = 1.99 * $scope.fondAAjoute.length * 0.8;
        }
        else {
            $scope.prix = 1.99 * $scope.fondAAjoute.length * 0.9;
        }

        console.log("prix : ", $scope.prix);
    };


    /**
    retourne le nombre de cart a partagé et le nombre de cart est récipoque  */

    var getCardShared = function(){
        me.get_cardsCount
        .then(function(res){
            $scope.countCardShared = res.shared;
            $scope.countCardReciprocal = res.reciprocal;
        });
    };


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


    $scope.orderAchatCredit = function(){

        me.purchase_many_credits($scope.fondAAjoute.length)
        .then(function(credits){
            console.log("shop_ctrl, orderAchatCredit nouveaux credits:", credits);
            $scope.user.credits = credits;
        });
        $scope.achatCredits = false;
    };


    $scope.buy_cards = function(){
        if($scope.user.credits < $scope.fondAAjoute.length){
            $scope.err.message = " Credit insuffisant";
        }
        else{
            me.purchase_card_buy($scope.fondAAjoute)
            .then(function(res){
                $scope.fondAAcheter = res.premium_cards;
                $scope.user.credits = res.credits;
            });
            $scope.achat = false;
        }
        
    }

  /**  var compareCards = function($scope.fondAAjoute,$scope.fondAAcheter){
        return matches.every(function(matched){
            if ($scope.fondAAjoute === $scope.fondAAcheter){
                return $scope.err.message = "carte deja acheter";
                }
            }
    }
    **/
});


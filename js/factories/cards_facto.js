app.factory("Cards", function($http, $q, $rootScope, $location) {
	
	return {

		acceptedCards: function (){
			
			return $q(function(resolve, reject) {
				if($rootScope.globals.currentUser && $rootScope.globals.currentUser.token) {

					var data = {};
				    //$http.defaults.headers.token = $rootScope.globals.currentUser.token;
				    var req = {
				        method: 'GET',
				        url: ROOT_URL + "/cards/accepted",
				        headers: {
				        	token: $rootScope.globals.currentUser.token
				        },
				        data: data

				    };
				    console.log("$http.defaults.headers.token : ", $http.defaults.headers.token);
					$http(req)
					.success(function(res){
						console.log(res);
						resolve(res);
					})
					.error(function(err) {
						console.log("Erreur requete acceptedCards", err);
						reject(err);
					});
				}
				else {
					reject("Cannot find currentUser");
				}
			});
		},

		decline: function (cardId) {
			return $q(function(resolve, reject){
				if($rootScope.globals.currentUser && $rootScope.globals.currentUser.token){

					req = {
						method: 'PUT',
				        url: ROOT_URL + "/cards/" + cardId + "/decline",
				        headers: {
				        	token: $rootScope.globals.currentUser.token
				        }
					};

					$http(req)
					.success(function(card){
						console.log("CardsFacto, decline, card declined");
						resolve(card);
					})
					.error(function(err){
						console.log("Erreur requete declinecard", err);
						reject(err);
					});
				}
				else {
					reject("User non authentifié");
				}
			});
		}
	};
});
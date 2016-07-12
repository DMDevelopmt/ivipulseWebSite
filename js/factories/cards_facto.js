app.factory("Cards", function($http, $q, $rootScope) {
	
	return {

		acceptedCards: function (){
			return $q(function(resolve, reject) {

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
			});
		}
	};
});
app.factory("Cards", function($http, $q) {
	
	return {

		acceptedCards: function (){
			return $q(function(resolve, reject) { 
				var cards = null;
				$http.get(ROOT_URL + "/cards/accepted")
				.success(function(res){
					console.log(res);
					resolve(res);
				});
		});
	}
};
});
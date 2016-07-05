app.factory("Cards", function($http, $q) {
	
	return {
		acceptedCards: function (){
			return $http.get(ROOT_URL + "/cards/accepted");
		}
	};
});
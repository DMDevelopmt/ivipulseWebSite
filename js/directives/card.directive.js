app.directive('ivicard', function(){
	return {
		restrict: 'E',
		template: "<div class ='card'><img src=''>avatar</img><span>{{card._sender.first_name}}</span><span>{{card._sender.last_name}}</span></div>",
		scope: {
			card: '='
		}
	};
});
app.directive('ivicard', function(){
	return {
		restrict: 'E',
		template: "<div class ='card background {{card._sender.template}}'><div><img src=''https://api.ivipulse.com/' + card._sender.avatar'></img><br><div>{{card._sender.first_name}}</div><div>{{card._sender.last_name}}</div></div></div>",
		scope: {
			card: '='
		}
	};
});
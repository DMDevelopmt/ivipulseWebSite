app.directive('ivicard', function(){
	return {
		restrict: 'E',
		template: "<div class ='card background {{template}}'><img src=''>avatar</img><br><div>{{first_name}}</div><div>{{last_name}}</div></div>",
		scope: {
			card: '='
		}
	};
});
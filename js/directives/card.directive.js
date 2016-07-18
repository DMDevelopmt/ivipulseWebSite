app.directive('ivicard', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/card.html',
		scope: {
			card: '='
		}
	};
});
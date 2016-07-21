app.directive('ivicard', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/card.html',
		scope: {
			card: '='
		}
	};
});

app.directive('infor',function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/signin.html',
		scope: {
			
		}
	}
})
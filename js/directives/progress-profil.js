module.directive('exampleProgress', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            max: '='
        },
        template: '<div class="progressBar"></div><div class="progressValue">{{ percentValue }}%</div>',
        link: link
    };
});
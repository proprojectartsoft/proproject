angular.module($APP.name).directive('sketch', [
    '$rootScope',
    function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $($element[0]).sketch();
                if (!$rootScope.sketch) {
                    $rootScope.sketch = $element[0].toDataURL("image/png");
                }
            }
        };
    }
]);
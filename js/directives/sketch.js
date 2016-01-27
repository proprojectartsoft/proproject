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

angular.module($APP.name).directive('scrollWatch', function ($rootScope, $window) {
    return function (scope, elem, attr) {
        var start = 0;
        var threshold = 100;

        elem.bind('scroll', function (e) {
            $rootScope.slideHeaderHelper = true;
            if (e.detail.scrollTop - start > threshold) {
                $rootScope.slideHeader = true;
            } else {
                $rootScope.slideHeader = false;
            }
            if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
                $rootScope.slideHeader = false;
            }
            $rootScope.slideHeaderPrevious = e.detail.scrollTop;
            $rootScope.$apply();

        });
        scope.$on('$destroy', function () {
            $rootScope.slideHeaderHelper = false;
            $rootScope.slideHeader = false;
            $rootScope.slideHeaderPrevious = 0;
        });
    };
});
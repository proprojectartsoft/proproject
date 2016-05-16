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

angular.module($APP.name).directive('ionicAutocomplete',
        function ($ionicPopover, $rootScope) {
            var popoverTemplate =
                    '<ion-popover-view style="margin-top:5px">' +
                    '<ion-content>' +
                    '<div class="list">' +
                    '<a class="item" ng-repeat="item in list | filter: {name: inputSearch}" ng-click="selectItem(item)">{{item.name}}</a>' +
                    '</div>' +
                    '</ion-content>' +
                    '</ion-popover-view>';
            return {
                restrict: 'A',
                scope: {
                    params: '=params',
                    list: '=list',
                    inputSearch: '=ngModel'
                },
                link: function ($scope, $element, $attrs) {
                    console.log($scope.params)
                    var popoverShown = false;
                    var popover = null;
                    $scope.items = $scope.params.items;

                    //Add autocorrect="off" so the 'change' event is detected when user tap the keyboard
                    $element.attr('autocorrect', 'off');


                    popover = $ionicPopover.fromTemplate(popoverTemplate, {
                        scope: $scope
                    });
                    $element.on('focus', function (e) {
                        if (!popoverShown) {
                            popover.show(e);
                        }
                    });

                    $scope.selectItem = function (item) {
                        popover.hide();
                        $scope.params.onSelect(item);
                    };
                }
            };
        }
);
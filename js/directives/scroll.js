angular.module($APP.name).directive('scroll', [
    '$timeout',
    '$window',
    '$ionicScrollDelegate',
    function ($timeout, $window, $ionicScrollDelegate) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {

                function elmYPosition(id) {
                    var elm = document.getElementById(id);
                    var y = elm.offsetTop;
                    var node = elm;
                    while (node.offsetParent && node.offsetParent !== document.body) {
                        node = node.offsetParent;
                        y += node.offsetTop;
                    }
                    return y;
                }

                $scope.goto = function (id) {
                    id = id ? id : $attrs["id"];
                    if (id) {
                        $scope.scroll_ref = $timeout(function () { // we need little delay
                            var stopY = elmYPosition(id) - 90;
                            $ionicScrollDelegate.scrollTo(0, stopY, true);

                        }, 50);
                    }
                }
            }
        };
    }
]);
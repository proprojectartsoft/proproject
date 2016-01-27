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
                    console.log('scrolls', y, node.getBoundingClientRect().top)
                    while (node.offsetParent && node.offsetParent !== document.body) {
                        node = node.offsetParent;
                        y += node.offsetTop;
                    }
                    return y;
                }

                $scope.goto = function (id) {
                    console.log('what', id)
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

angular.module($APP.name).directive('ngAutoExpand', function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.bind('keyup', function ($event) {
                var element = $event.target;

                $(element).height(0);
                var height = $(element)[0].scrollHeight;

                // 8 is for the padding
                if (height < 20) {
                    height = 28;
                }
                $(element).height(height - 8);
            });

            // Expand the textarea as soon as it is added to the DOM
            setTimeout(function () {
                var element = elem;

                $(element).height(0);
                var height = $(element)[0].scrollHeight;

                // 8 is for the padding
                if (height < 20) {
                    height = 28;
                }
                $(element).height(height - 8);
            }, 0)
        }
    };
});


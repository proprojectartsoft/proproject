angular.module($APP.name).directive('input', [
    function () {
        return {
            restrict: 'A',
            link: function ($scope, $elem, $attrs) {
                $elem.bind('click', function () {
                    $elem[0].focus();
                }); // fixes bug
                $elem.bind('focus', function () {
                    $scope.$emit('focus');
                });
                $elem.bind('blur', function () {
                    $scope.$emit('blur');
                });
            }
        };
    }
]);
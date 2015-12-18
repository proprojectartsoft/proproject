angular.module($APP.name).directive('sketchErase', [
    function () {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $scope.erase = function () {
                    $('#' + $attrs.sketchErase).sketch().actions = [];
                    var myCanvas = document.getElementById($attrs.sketchErase);
                    var ctx = myCanvas.getContext('2d');
                    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
                };
            }
        };
    }
]);

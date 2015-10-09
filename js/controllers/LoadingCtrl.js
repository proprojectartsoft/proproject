angular.module($APP.name).controller('LoadingCtrl', function ($scope, $ionicLoading) {
    $scope.show = function () {
        $ionicLoading.show({
            templateUrl: '/view/spinner.html'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
});
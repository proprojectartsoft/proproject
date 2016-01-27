angular.module($APP.name).controller('ForgotPasswordCtrl', [
    '$scope',
    'AuthService',
    '$state',
    '$ionicPopup',
    function ($scope, AuthService, $state, $ionicPopup) {
        $scope.user = [];
        $scope.user.username = "";
        $scope.submit = function () {
            $scope.syncPopup = $ionicPopup.alert({
                title: "Sending request",
                template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                content: "",
                buttons: []
            });
            AuthService.forgotpassword($scope.user.username).then(function (result) {
                $scope.user.username = "";
                $state.go('login');
                $scope.syncPopup.close();
            });
        };
    }
]);
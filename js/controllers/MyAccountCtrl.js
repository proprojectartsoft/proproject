angular.module($APP.name).controller('MyAccountCtrl', [
    '$rootScope',
    '$scope',
    'AuthService',
    'UserService',
    function ($rootScope, $scope, AuthService, UserService) {
        $scope.server = $APP.server;
        AuthService.me().then(function (me) {
            if (me !== 'error') {
                $rootScope.role_id = me.role.id;
                $rootScope.accessed = me.accessed;
                UserService.get(me.id).then(function (result) {
                    $scope.profileHeader = result;
                })
            }
        });
        $scope.saveChanges = function () {
            UserService.update($scope.profileHeader)
        }
    }
]);




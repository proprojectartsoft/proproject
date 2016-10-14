angular.module($APP.name).controller('LoginCtrl', [
  '$scope',
  '$state',
  'AuthService',
  'CacheFactory',
  '$rootScope',
  '$timeout',
  'SyncService',
  function ($scope, $state, AuthService, CacheFactory, $rootScope, $timeout, SyncService) {
    $scope.user = [];
    $scope.user.username = "";
    $scope.user.password = "";
    $scope.user.rememberMe = false;
    $scope.popupOpen = false;


    var ppremember = localStorage.getObject('ppremember');

    if (ppremember) {
      $scope.user.username = $scope.hasRemember.username;
      $scope.user.password = $scope.hasRemember.password;
      $scope.user.rememberMe = true;
    }


    $scope.login = function () {
      AuthService.login({
        username: $scope.user.username,
        password: $scope.user.password
      }).then(function (response) {
        if (response) {
          localStorage.setObject('ppreload', {'username': $scope.user.username, 'password': $scope.user.password});
          if ($scope.user.rememberMe) {
            localStorage.setObject('ppremember', {'username': $scope.user.username, 'password': $scope.user.password});
          }

          $timeout(function () {
            SyncService.sync();
            $state.go('app.categories', {'projectId': $rootScope.projectId});
          });
        }
      });
    };
  }
]);

angular.module($APP.name).controller('FormsCtrl', [
  '$scope',
  '$stateParams',
  'FormDesignService',
  '$rootScope',
  'CacheFactory',
  'AuthService',
  '$state',
  '$ionicPopup',
  '$ionicHistory',
  '$anchorScroll',
  '$ionicSideMenuDelegate',
  'DbService',
  'SyncService',
  function ($scope, $stateParams, FormDesignService, $rootScope, CacheFactory, AuthService, $state, $ionicPopup, $ionicHistory, $anchorScroll, $ionicSideMenuDelegate, DbService, SyncService) {

    $scope.$on('$ionicView.enter', function () {
      $ionicHistory.clearHistory();
      $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.isLoaded = false;
    $scope.hasData = '';
    $scope.categoryId = $stateParams.categoryId;
    $rootScope.slideHeader = false;
    $rootScope.slideHeaderPrevious = 0;
    $rootScope.slideHeaderHelper = false;

    $rootScope.$on('$stateChangeStart', function () {
      $anchorScroll.yOffset = 0;
    });

    AuthService.me().then(function (user) {
      if (user && user.active === false) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Your account has been de-activated. Contact your supervisor for further information.',
        });

        AuthService.logout().success(function () {
          $state.go('login');
        }, function () {
        });
      }
      else{
        SyncService.sync_close();
      }
    })






    $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;

    $scope.refresh = function () {
      SyncService.sync_button()
    };

    $scope.fixScroll = function () {
      $rootScope.slideHeader = false;
      $rootScope.slideHeaderPrevious = 0;
      $rootScope.slideHeaderHelper = false;
    }
  }
]);

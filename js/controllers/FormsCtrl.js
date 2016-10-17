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
    'SyncService',
    'DbService',
    function ($scope, $stateParams, FormDesignService, $rootScope, CacheFactory, AuthService, $state, $ionicPopup, $ionicHistory, $anchorScroll, $ionicSideMenuDelegate, SyncService, DbService) {

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

            }
        }, function errorCallback(error) {
            console.log(error, error.status);
        });


        // $rootScope.formDesigns = [];
        $rootScope.formDesigns = DbService.list_design($stateParams.categoryId)
        // angular.forEach(designsCache, function (aux) {
        //     if (aux.category_id === parseInt($stateParams.categoryId)) {
        //         $rootScope.formDesigns.push(aux);
        //     }
        // });
        $scope.isLoaded = true;
        if ($rootScope.formDesigns.length === 0) {
            $scope.hasData = 'no data';
        }


        $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;

        $scope.refresh = function () {
          $rootScope.formDesigns = [];
          designsCache = DbService.get('designs')
          angular.forEach(designsCache, function (aux) {
              if (aux.category_id === parseInt($stateParams.categoryId)) {
                  $rootScope.formDesigns.push(aux);
              }
          });
        };

        $scope.fixScroll = function () {
            $rootScope.slideHeader = false;
            $rootScope.slideHeaderPrevious = 0;
            $rootScope.slideHeaderHelper = false;
        }
    }
]);

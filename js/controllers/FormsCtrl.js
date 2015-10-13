angular.module($APP.name).controller('FormsCtrl', [
    '$scope',
    '$location',
    'FormDesignService',
    '$rootScope',
    'FormInstanceService',
    'CacheFactory',
    '$ionicModal',
    function ($scope, $location, FormDesignService, $rootScope, FormInstanceService, CacheFactory, $ionicModal) {
        $scope.isLoaded = false;
        $scope.hasData = false;


        FormDesignService.list($rootScope.categoryId).then(function (data) {
            $scope.isLoaded = true;
            $scope.formDesigns = data;
            if (data.length !== 0) {
                $scope.hasData = true;
            }
        }, function errorCallback(response) {
            var designsListCache = CacheFactory.get('designsListCache');
            if (!designsListCache || designsListCache.length === 0) {
                designsListCache = CacheFactory('designsListCache');
                designsListCache.setOptions({
                    storageMode: 'localStorage'
                });
            }
            $scope.formDesigns = designsListCache.get($rootScope.categoryId);
        });

        $scope.refresh = function () {
            FormDesignService.list($rootScope.categoryId).then(function (data) {
                $scope.formDesigns = data;
                if (data.length !== 0) {
                    $scope.hasData = true;
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.change = function (id, name) {
            $rootScope.formId = id;
            $rootScope.formName = name;
            $ionicModal.fromTemplateUrl('view/form/_loading.html', {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose: false,
                hardwareBackButtonClose: false,
                focusFirstInput: true
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
                FormDesignService.get($rootScope.formId).then(function (data) {
                    $rootScope.rootForm = data;
                    $scope.modal.hide();
                    $location.path("/app/form/" + $rootScope.projectId + "/" + id);
                }, function errorCallback(response) {
                    $scope.modal.hide();
                    var designsCache = CacheFactory.get('designsCache');
                    if (!designsCache || designsCache.length === 0) {
                        designsCache = CacheFactory('designsCache');
                        designsCache.setOptions({
                            storageMode: 'localStorage'
                        });
                    }
                    $rootScope.rootForm = designsCache.get($rootScope.formId);
                    $location.path("/app/form/" + $rootScope.projectId + "/" + id);
                });
            });

        }
        $scope.back = function () {
            console.log('forms:', $rootScope.projectId, $rootScope.categoryId);
        };

    }
]);
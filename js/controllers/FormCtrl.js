angular.module($APP.name).controller('FormCtrl', [
    '$scope',
    'FormInstanceService',
    '$timeout',
    'FormUpdateService',
    '$location',
    '$rootScope',
    'FormDesignService',
    'CacheFactory',
    '$ionicPopup',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, FormDesignService, CacheFactory, $ionicPopup) {
        $scope.isLoaded = false;
        $timeout(function () {
            FormDesignService.get($rootScope.formId).then(function (data) {
                $scope.formData = data;
                $scope.isLoaded = true;
            }, function errorCallback(response) {
                $scope.isLoaded = true;
                var designsCache = CacheFactory.get('designsCache');
                if (!designsCache || designsCache.length === 0) {
                    designsCache = CacheFactory('designsCache');
                    designsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $scope.formData = designsCache.get($rootScope.formId);
            });
        }, 1000);


        $scope.submit = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'New form',
                template: 'Are you sure you want to submit the data?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    FormInstanceService.create($scope.formData).then(function (data) {
                        if (data) {
                            $rootScope.formId = data.id;
                            FormInstanceService.get($rootScope.formId).then(function (data) {
                                $rootScope.rootForm = data;
                                $location.path("/app/view/" + $rootScope.projectId + "/form/" + data.id);
                            })
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'New form',
                                template: 'Submision failed.',
                            });
                            alertPopup.then(function (res) {
                                $location.path("/app/categories/" + $rootScope.projectId);
                            });
                        }
                    })
                }
            });

        };
        $scope.toggleGroup = function (group, callback) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
            callback();
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
        $scope.$on('updateScopeFromDirective', function () {
            FormUpdateService.addProduct($scope.formData, $scope.modalHelper);
        });
        $scope.$on('moduleSaveChanges', function () {
            $scope.formData = FormUpdateService.getProducts();
        });
    }
]);
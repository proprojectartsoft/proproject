angular.module($APP.name).controller('FormCtrl', [
    '$scope',
    'FormInstanceService',
    '$ionicModal',
    'FormUpdateService',
    '$location',
    '$rootScope',
    'FormDesignService',
    function ($scope, FormInstanceService, $ionicModal, FormUpdateService, $location, $rootScope, FormDesignService) {
        $scope.formData = $rootScope.rootForm;

        $scope.back = function () {
            $location.path("/about");
        };
        $scope.submit = function () {
            FormInstanceService.create($scope.formData).then(function (data) {
                if (data) {
                    $rootScope.formId = data.id;
                    FormInstanceService.get($rootScope.formId).then(function (data) {
                        $rootScope.rootForm = data;
                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + data.id);
                    })
                }
                else {
                    $location.path("/app/categories/" + $rootScope.projectId);
                }
            })

//                    .then(function (data) {
//                $rootScope.formId = data.id;
//                FormDesignService.get($rootScope.formId).then(function (data) {
//                    $rootScope.rootForm = data;
//                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + data.id);
//            $location.path("/app/categories/" + $rootScope.projectId);
//                });
//            });
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
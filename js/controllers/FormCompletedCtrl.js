angular.module($APP.name).controller('FormCompletedCtrl', [
    '$scope',
    '$state',
    'FormInstanceService',
    '$ionicLoading',
    '$rootScope',
    '$location',
    '$timeout',
    function ($scope, $state, FormInstanceService, $ionicLoading, $rootScope, $location, $timeout) {
        $scope.isLoaded = false;
        $scope.hasData = false;

        FormInstanceService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
            $timeout(function () {
                $scope.isLoaded = true;
            }, 1000);
            $scope.formInstances = data;
            if (data.length !== 0) {
                $scope.hasData = true;
            }
        });

        $scope.refresh = function () {
            FormInstanceService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
                $scope.formInstances = data;
                if (data.length !== 0) {
                    $scope.hasData = true;
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.change = function (id) {
            $rootScope.formId = id;
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/form/" + id);
            });
        };
        $scope.test = function () {
            console.log('test');
        };
        $scope.form = function (completedFormId) {
            $state.go("app.form")
        }
    }
]);
angular.module($APP.name).controller('FormInstanceCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function ($scope, $rootScope, $stateParams, $location) {
        $scope.isLoaded = false;
        $scope.hasData = false;
        $scope.formData = $rootScope.rootForm;
        if ($scope.formData.length !== 0) {
            $scope.hasData = true;
        }
        $scope.back = function () {
            if ($stateParams.type === "register") {
                $location.path("/app/register/" + $rootScope.projectId + "/" + $scope.formData.code);
            }
            if ($stateParams.type === "form") {
                $location.path("/app/view/" + $rootScope.projectId + "/" + $scope.formData.category_id);
            }
        };
        $scope.edit = function () {
            $location.path("/app/edit/" + $rootScope.projectId + "/" + $scope.formData.id);
        };
    }
]);
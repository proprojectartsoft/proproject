angular.module($APP.name).controller('FormInstanceCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'FormInstanceService',
    '$ionicSideMenuDelegate',
    function ($scope, $rootScope, $stateParams, $location, FormInstanceService, $ionicSideMenuDelegate) {
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.isLoaded = false;
        $scope.hasData = false;
        $scope.formData = $rootScope.rootForm;
        $rootScope.slideHeader = false;
        $rootScope.slideHeaderPrevious = 0;
        $rootScope.slideHeaderHelper = false;

        FormInstanceService.get($rootScope.formId).then(function (data) {
            $rootScope.formData = data;
            $scope.formData = data;
        });        

        if ($scope.formData.length !== 0) {
            $scope.hasData = true;
        }
        $scope.back = function () {
            if ($stateParams.type === "register") {
                $location.path("/app/register/" + $rootScope.projectId + "/" + $scope.formData.category_id + "/" + $scope.formData.code);
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
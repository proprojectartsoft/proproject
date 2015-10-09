angular.module($APP.name).controller('SignatureModalCtrl', [
    '$scope',
    '$rootScope',
    'FormUpdateService',
    'FieldUpdateService',
    function ($scope, $rootScope, FormUpdateService, FieldUpdateService) {
        $scope.data = [];        
        $scope.exit = function () {            
            $scope.templateClick('');
            $scope.modal.hide();
        };
        $scope.save = function (hash) {
            $scope.data.value = document.getElementById(hash).toDataURL("image/png");
            $scope.templateClick($scope.data.value);
            $scope.modal.hide();

        };
        $scope.templateClick = function (newValue) {
            $scope.aux = FormUpdateService.getProducts();
            $scope.xua = FieldUpdateService.getProducts();
            $scope.formData = $scope.aux;
            $scope.modalHelper = $scope.xua;
            for (var i = 0; i < $scope.formData.field_group_designs.length; i++) {
                if ($scope.formData.field_group_designs[i].id === $scope.modalHelper.groupId) {
                    for (var j = 0; j < $scope.formData.field_group_designs[i].field_designs.length; j++) {
                        if ($scope.formData.field_group_designs[i].field_designs[j].id === $scope.modalHelper.fieldId) {
                            $scope.formData.field_group_designs[i].field_designs[j].value = newValue;
                            FormUpdateService.addProduct($scope.formData);
                            $rootScope.$broadcast('moduleSaveChanges');
                        }
                    }
                }
            }
            $scope.modal.hide();
        };
    }
]);
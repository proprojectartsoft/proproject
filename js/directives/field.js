angular.module($APP.name).directive('field', [
    '$rootScope',
    'FieldUpdateService',
    '$ionicModal',
    function ($rootScope, FieldUpdateService, $ionicModal) {

        return {
            templateUrl: 'view/form/_all.html',
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function ($scope, $elem, $attrs) {
                $scope.value = $scope.data.value;
                $scope.dirty = false;
                $scope.submit = false;
                $scope.hash = "H" + $scope.$id;
                $ionicModal.fromTemplateUrl('view/form/_modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false,
                    focusFirstInput: true
                }).then(function (modal) {
                    $scope.modal = modal;
                });
                $scope.$on('submit', function () {

                    if ($scope.data.type === "checkbox") {
                        $scope.data.value = $scope.data.value ? true : false;
                    }

                    if ($scope.data.type === "checkbox_list") {
//                        $scope.data.value = $scope.data.value ? true : false;
//                        var list = [];
//                        for(var i=0;i< $scope.data.option_designs.length;i++){
//                            if($scope.data.option_designs[i].value === 'true' || $scope.data.option_designs[i].value === true){
//                                list.push($scope.)
//                            }
//                        }
                    }

                    if ($scope.data.type === "radio") {
//                        console.log($scope.data);
                    }

                    if ($scope.data.type === "date") {
//                        //transform to yyyy/mm/dd
//                        var today = new Date();
//                        var dd = today.getDate();
//                        var MM = today.getMonth() + 1; //January is 0!
//
//                        var yyyy = today.getFullYear();
//                        if (dd < 10) {
//                            dd = '0' + dd;
//                        }
//                        if (MM < 10) {
//                            MM = '0' + MM;
//                        }
//                        var today = yyyy + '-' + MM + '-' + dd;
//                        $scope.data.value = today;
//                        console.log('today', today);
                    }
                    $scope.submit = true;
                });
                $scope.directiveClick = function (hash) {
                    $scope.modalHelper = [];
                    $scope.modalHelper.groupId = $scope.data.field_group_design_id;
                    $scope.modalHelper.fieldId = $scope.data.id;
//                    $rootScope.signatureHash = $scope.hash;
                    $ionicModal.fromTemplateUrl('view/form/_modal.html', {
                        scope: $scope,
                        animation: 'slide-in-up',
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false,
                        focusFirstInput: true
                    }).then(function (modal) {
                        $scope.modal = modal;
                        $scope.modal.hash = $scope.hash
                        FieldUpdateService.addProduct($scope.modalHelper);
                        $rootScope.$broadcast('updateScopeFromDirective');
                        $scope.modal.show();
                    });

                }

                $scope.$watch('data.errors', function (data) {
                    if (data && data.length) {
                        angular.element($elem[0].firstChild).addClass('has-error');
                        $rootScope.$emit('invalidField', $scope.data);
                    }
                    else {
                        angular.element($elem[0].firstChild).removeClass('has-error');
                        $rootScope.$emit('validField', $scope.data);
                    }
                });

                $scope.$watch('data.value', function (data) {
                    if ($scope.value !== $scope.data.value) {
                        $scope.dirty = true;
                    }
                    if ((!$scope.data.value && $scope.dirty) || $scope.submit || ($scope.data.value && $scope.data.errors && $scope.data.errors.length)) {
                        $scope.$emit('validateField', $scope.data);
                    }
                });
                $scope.$on('focus', function () {
                    $elem.addClass('focus');
                });

                $scope.$on('blur', function () {
                    $elem.removeClass('focus');
                });

            }
        };
    }
]);

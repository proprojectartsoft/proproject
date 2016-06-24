angular.module($APP.name).controller('FormCtrl', [
    '$scope',
    'FormInstanceService',
    '$timeout',
    'FormUpdateService',
    'StaffService',
    '$rootScope',
    'CacheFactory',
    '$ionicScrollDelegate',
    '$ionicPopup',
    '$stateParams',
    '$ionicListDelegate',
    '$ionicModal',
    '$cordovaCamera',
    '$state',
    'SyncService',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    'ResourceService',
    'PayitemService',
    'SchedulingService',
    '$ionicPopover',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, StaffService, $rootScope, CacheFactory, $ionicScrollDelegate, $ionicPopup, $stateParams, $ionicListDelegate, $ionicModal, $cordovaCamera, $state, SyncService, $ionicSideMenuDelegate, $ionicHistory, ResourceService, PayitemService, SchedulingService, $ionicPopover) {
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $ionicSideMenuDelegate.canDragContent(false);


//        $rootScope.resource_list = [{"id": 706, "name": "Bolt15", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O107", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 350, "resource_type_name": "Operative", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 802, "name": "Jim Gray", "employer": null, "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "staff": true, "product_ref": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "unit_id": 17, "unit_name": "hr", "resource_type_id": 400, "resource_type_name": "15", "direct_cost": 100.0, "resource_margin": null, "stage_id": null, "stage_name": null, "customer_id": 2700}, {"id": 702, "name": "Bolt", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O107", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 350, "resource_type_name": "Operative", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 704, "name": "Bolt11", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O107", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 350, "resource_type_name": "Operative", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 705, "name": "Bolt12", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O107", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 350, "resource_type_name": "Operative", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 707, "name": "Bolt16", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O107", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 350, "resource_type_name": "Operative", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 800, "name": "Anthony Hanna8", "employer": null, "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "staff": true, "product_ref": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "unit_id": 17, "unit_name": "hr", "resource_type_id": 400, "resource_type_name": "15", "direct_cost": 100.0, "resource_margin": null, "stage_id": null, "stage_name": null, "customer_id": 2700}, {"id": 804, "name": "Jim Gray3", "employer": null, "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "staff": true, "product_ref": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "unit_id": 17, "unit_name": "hr", "resource_type_id": 400, "resource_type_name": "15", "direct_cost": 100.0, "resource_margin": 20.0, "stage_id": null, "stage_name": null, "customer_id": 2700}, {"id": 600, "name": "Joiner", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O105", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 601, "name": "Concrete 21/21/121", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "C221", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 13, "unit_name": "m3", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 2.11, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 350, "name": "Stabilised sand", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": null, "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 13, "unit_name": "m3", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 80.0, "resource_margin": null, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 355, "name": "Plywood 6mm 607x2440mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T103", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 8.7, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 356, "name": "Plywood 6mm 606x1220mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T101", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 5.82, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 357, "name": "Plywood 6mm 607x1829mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T102", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 7.98, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 358, "name": "Plywood 6mm 1220x2440mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T104", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 15.18, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 359, "name": "Plywood 9mm 1220x2440mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T107", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 19.5, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 360, "name": "Plywood 9mm 607x1220mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T105", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 8.1, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 361, "name": "Plywood 9mm 607x1829mm", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "T106", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 19, "unit_name": "No", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 11.82, "resource_margin": null, "stage_id": 8, "stage_name": "Carpentry", "customer_id": 2700}, {"id": 400, "name": "Ciment Truck", "employer": null, "role": null, "email": null, "vat": null, "staff": false, "product_ref": null, "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 6, "unit_name": "T", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 0.0, "resource_margin": null, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 401, "name": "Sand Truck", "employer": null, "role": null, "email": null, "vat": null, "staff": false, "product_ref": null, "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 6, "unit_name": "T", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 0.0, "resource_margin": null, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 501, "name": "Nail guns", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "CSV03", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 6, "unit_name": "T", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 20.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 502, "name": "Nail", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "CSV05", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 6, "unit_name": "T", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 20.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 558, "name": "Shutter Joiner", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "O105", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 559, "name": "Concrete 20/20/120", "employer": null, "role": null, "email": null, "vat": 20.0, "staff": false, "product_ref": "C221", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 13, "unit_name": "m3", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 2.11, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 566, "name": "Plugs", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "Misc", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 11, "unit_name": "m", "resource_type_id": 2, "resource_type_name": "Material", "direct_cost": 100.0, "resource_margin": 100.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 708, "name": "Drywall", "employer": null, "role": null, "email": null, "vat": 30.0, "staff": false, "product_ref": "A-102", "telephone_number": null, "safety_card_number": null, "expiry_date": null, "unit_id": 17, "unit_name": "hr", "resource_type_id": 350, "resource_type_name": "Operative", "direct_cost": 100.0, "resource_margin": 2.0, "stage_id": 4, "stage_name": "Concrete", "customer_id": 2700}, {"id": 801, "name": "Anthony Hanna9", "employer": null, "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "staff": true, "product_ref": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "unit_id": 17, "unit_name": "hr", "resource_type_id": 400, "resource_type_name": "15", "direct_cost": 100.0, "resource_margin": null, "stage_id": null, "stage_name": null, "customer_id": 2700}, {"id": 803, "name": "Jim Gray2", "employer": null, "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "staff": true, "product_ref": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "unit_id": 17, "unit_name": "hr", "resource_type_id": 400, "resource_type_name": "15", "direct_cost": 100.0, "resource_margin": 20.0, "stage_id": null, "stage_name": null, "customer_id": 2700}, {"id": 850, "name": "Anthony Hanna10", "employer": null, "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "staff": true, "product_ref": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "unit_id": 17, "unit_name": "hr", "resource_type_id": 400, "resource_type_name": "15", "direct_cost": 100.0, "resource_margin": null, "stage_id": null, "stage_name": null, "customer_id": 2700}]
//        $rootScope.staff_list = [{"id": 802, "name": "Jim Gray", "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "employee_name": null, "employee_number": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "customer_id": 2700, "unit_name": "hr", "resource_type": "15", "direct_cost": 100.0, "resource_margin": 0.0}, {"id": 800, "name": "Anthony Hanna8", "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "employee_name": null, "employee_number": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "customer_id": 2700, "unit_name": "hr", "resource_type": "15", "direct_cost": 100.0, "resource_margin": 0.0}, {"id": 804, "name": "Jim Gray3", "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "employee_name": null, "employee_number": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "customer_id": 2700, "unit_name": "hr", "resource_type": "15", "direct_cost": 100.0, "resource_margin": 20.0}, {"id": 801, "name": "Anthony Hanna9", "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "employee_name": null, "employee_number": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "customer_id": 2700, "unit_name": "hr", "resource_type": "15", "direct_cost": 100.0, "resource_margin": 0.0}, {"id": 803, "name": "Jim Gray2", "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "employee_name": null, "employee_number": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "customer_id": 2700, "unit_name": "hr", "resource_type": "15", "direct_cost": 100.0, "resource_margin": 20.0}, {"id": 850, "name": "Anthony Hanna10", "role": "Site Manager", "email": "anthony@hanna.com", "vat": 15.0, "employee_name": null, "employee_number": "10", "telephone_number": "2890741598", "safety_card_number": "981723", "expiry_date": "23.02.2017", "customer_id": 2700, "unit_name": "hr", "resource_type": "15", "direct_cost": 100.0, "resource_margin": 0.0}];
        $ionicPopover.fromTemplateUrl('view/search.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.doTotal = function (type, parent) {
            parent.total_cost = 0;
            if (type === 'resource') {
                angular.forEach(parent.resources, function (res) {
                    if (isNaN(res.quantity)) {
                        res.total_cost = 0;
                    }
                    if (isNaN(res.direct_cost)) {
                        res.total_cost = 0;
                    }
                    parent.total_cost = parent.total_cost + res.quantity * res.direct_cost;
                });
            }
            if (type === 'piresource') {
                console.log('piresource', parent)
                angular.forEach(parent.resources, function (res) {
                    if (isNaN(res.quantity)) {
                        res.total_cost = 0;
                    }
                    if (isNaN(res.direct_cost)) {
                        res.total_cost = 0;
                    }
                    parent.total_cost = parent.total_cost + res.quantity * res.direct_cost;
                });
            }
            if (type === 'pisubresource') {
                angular.forEach(parent.resources, function (res) {
                    if (isNaN(res.quantity)) {
                        res.total_cost = 0;
                    }
                    if (isNaN(res.direct_cost)) {
                        res.total_cost = 0;
                    }
                    parent.total_cost = parent.total_cost + res.quantity * res.direct_cost;
                });
            }
            if (type === 'pisubtask') {
                console.log(parent)
                angular.forEach(parent.subtasks, function (stk) {
                    if (isNaN(stk.total_cost)) {
                        stk.total_cost = 0;
                    }
                    parent.total_cost = parent.total_cost + stk.total_cost;
                });
            }
            if (type === 'pi') {
                angular.forEach(parent.pay_items, function (pi) {
                    if (isNaN(pi.total_cost)) {
                        pi.total_cost = 0;
                    }
                    parent.total_cost = parent.total_cost + pi.total_cost;
                });
            }
        }


        $scope.openPopover = function ($event, predicate, test) {
            $scope.filter.popup_predicate = predicate;
            if (test !== 'pi') {
                $scope.filter.pi = false;
                if (predicate.staff) {
                    $scope.filter.popup_list = $rootScope.staff_list;
                }
                else {
                    $scope.filter.popup_list = $rootScope.resource_list;
                }
            }
            else {
                $scope.filter.pi = true;
                PayitemService.list_payitems($stateParams.projectId).then(function (data) {
                    $rootScope.payitem_list = data;
                    $scope.filter.popup_list = $rootScope.payitem_list;
                });

            }
            $scope.popover.show($event);
        };
        $scope.selectPopover = function (item) {
            if (!$scope.filter.pi) {
                $scope.filter.popup_predicate.name = item.name;
                if (!$scope.filter.popup_predicate.staff) {
                    //resource
                    $scope.filter.popup_predicate.name = item.name;
                    $scope.filter.popup_predicate.product_ref = item.product_ref;
                    $scope.filter.popup_predicate.direct_cost = item.direct_cost;
                    angular.forEach($rootScope.resource_type_list, function (restyp) {
                        console.log(restyp.id, item.resource_type_id)
                        if (restyp.name === item.resource_type_name) {
                            $scope.filter.popup_predicate.res_type_obj = restyp;
                            $scope.filter.popup_predicate.resource_type_id = restyp.id;
                            $scope.filter.popup_predicate.resource_type_name = restyp.name;
                        }
                    });
                    angular.forEach($rootScope.unit_list, function (unt) {
                        if (unt.name === item.unit_name) {
                            $scope.filter.popup_predicate.unit_obj = unt;
                            $scope.filter.popup_predicate.unit_id = unt.id;
                            $scope.filter.popup_predicate.unit_name = unt.name;
                        }
                    });
                }
                else {
                    //staff
                    $scope.filter.popup_predicate.name = item.name;
                    $scope.filter.popup_predicate.employer_name = item.employee_name;
                    $scope.filter.popup_predicate.staff_role = item.role;
                    $scope.filter.popup_predicate.direct_cost = item.direct_cost;
                    angular.forEach($rootScope.resource_type_list, function (restyp) {
                        console.log(restyp.id, item.resource_type_id)
                        if (restyp.name === item.resource_type_name) {
                            $scope.filter.popup_predicate.res_type_obj = restyp;
                            $scope.filter.popup_predicate.resource_type_id = restyp.id;
                            $scope.filter.popup_predicate.resource_type_name = restyp.name;
                        }
                    });
                }
            }
            else {
                $scope.filter.popup_predicate.description = item.description;
                $scope.filter.popup_predicate.reference = item.reference;
                angular.forEach($rootScope.unit_list, function (unt) {
                    if (unt.name === item.unit_name) {
                        $scope.filter.popup_predicate.unit_obj = unt;
                        $scope.filter.popup_predicate.unit_id = unt.id;
                        $scope.filter.popup_predicate.unit_name = unt.name;
                    }
                });
            }
            $scope.popover.hide();
        }
        $scope.closePopover = function () {
            $scope.popover.hide();
        }


        var designsCache = CacheFactory.get('designsCache');
        if (!designsCache || designsCache.length === 0) {
            designsCache = CacheFactory('designsCache');
            designsCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.filter = {
            state: 'form',
            actionBtn: false,
            edit: true,
            popup_title: 'Resource filter',
            popup_list: [],
            searchText: ''
        };
        $scope.items = [
            {display: 'Hello'},
            {display: 'Baha'},
            {display: 'Ala'},
            {display: 'Siwar'},
            {display: 'Monira'},
            {display: 'Samir'},
            {display: 'Spange Bob'},
            {display: 'Deneris Targariant'},
            {display: 'Ned Stark'}
        ];
        $scope.onSelect = function (item) {
            console.log('item', item);
            if ($scope.filter.state === 'resource') {
                $scope.filter.substate.name = item.name;
                $scope.filter.substate.product_ref = item.product_ref;
                $scope.filter.substate.direct_cost = item.direct_cost;
                angular.forEach($rootScope.unit_list, function (unit) {
                    if (unit.id === item.unit_id) {
                        $scope.filter.substate.unit_obj = unit;
                    }
                });
                angular.forEach($rootScope.resource_type_list, function (res_type) {
                    if (res_type.id === item.resource_type_id) {
                        $scope.filter.substate.resource_type_obj = res_type;
                    }
                });
            }
        };

        $scope.formData = designsCache.get($stateParams.formId);
        $scope.shownGroup = $scope.formData.field_group_designs[0];
        $scope.filter.vat = $rootScope.custSett.vat;
        $scope.filter.currency = $rootScope.custSett.currency;
        $scope.filter.margin = $rootScope.custSett.margin;
        $scope.filter.start = $rootScope.custSett.start;
        $scope.filter.break = $rootScope.custSett.break;
        $scope.filter.finish = $rootScope.custSett.finish;
        if ($scope.formData.resource_field_design) {
            $scope.resourceField = {
                'id': 0,
                'customer_id': $scope.formData.customer_id,
                'register_nominated': $scope.formData.resource_field_design.register_nominated,
                'date_option': $scope.formData.resource_field_design.date_option,
                'financial_option': $scope.formData.resource_field_design.financial_option,
                'total_cost': 0,
                'resources': [
                    {
                        "id": 0,
                        "resource_field_id": 0,
                        "resource_id": 0,
                        "position": 0,
                        "calculation": false,
                        "name": '', "product_ref": '', "unit_id": 0,
                        "unit_name": '', "resource_type_id": 0,
                        "resource_type_name": '', "direct_cost": 0,
                        "resource_margin": 0,
                        "stage_id": 1,
                        "stage_name": '', "vat": 0,
                        "quantity": 0,
                        "current_day": '', "total_cost": 0,
                        "staff_role": '', "expiry_date": '',
                        "abseteeism_reason_name": ''
                    }
                ]
            };
            $scope.filter.substate = $scope.resourceField.resources[0];
        }
        if ($scope.formData.pay_item_field_design) {
            $scope.payitemField = {
                "id": 0,
                'register_nominated': $scope.formData.pay_item_field_design.register_nominated,
                'display_subtask': $scope.formData.pay_item_field_design.display_subtask,
                'display_resources': $scope.formData.pay_item_field_design.display_resources,
                "pay_items": [
                    {
                        "description": "", "reference": "", "unit": "", "quantity": "", "open": true,
                        "child": true,
                        "subtasks": [], "resources": [
                        ]
                    }
                ]
            };
            $scope.filter.substate = $scope.payitemField.pay_items[0];
        }
        if ($scope.formData.scheduling_field_design) {
            $scope.payitemField = {
                "id": 0,
                'display_subtask': $scope.formData.scheduling_field_design.true,
                "pay_items": [
                    {
                        "description": "", "reference": "", "unit": "", "quantity": "", "open": true,
                        "child": true,
                        "subtasks": [], "resources": [
                        ]
                    }
                ]
            };
            $scope.filter.substate = $scope.payitemField.pay_items[0];
        }
        if ($scope.formData.staff_field_design) {
            $scope.staffField = {
                'id': 0,
                'withTimes': $scope.formData.staff_field_design.withTimes,
                'resources': [{
                        name: "",
                        customerId: 0,
                        employer_name: "",
                        staff_role: "",
                        product_ref: "",
                        unit_name: "",
                        direct_cost: 0.0,
                        resource_type_name: "",
                        resource_margin: 0,
                        telephone_number: "",
                        email: "",
                        safety_card_number: "",
                        expiry_date: "",
                        staff: true,
                        current_day: "",
                        start_time: $scope.filter.start,
                        break_time: $scope.filter.break,
                        finish_time: $scope.filter.finish,
                        total_time: "",
                        comment: "",
                        open: true,
                        vat: 0.0
                    }
                ]
            };
            console.log($scope.staffField)
            $scope.filter.substate = $scope.staffField.resources[0];
        }


        $scope.actionBtnPayitem = function () {
            if ($scope.filter.state === 'payitem' || $scope.filter.state === 'scheduling') {
                if ($scope.filter.substate && !$scope.filter.substateStk) {
                    if ($scope.filter.substate.resources.length === 0 && $scope.filter.substate.subtasks.length === 0) {
                        $scope.filter.actionBtn = !$scope.filter.actionBtn;
                    } else {
                        if ($scope.filter.substate.resources.length !== 0 && $scope.filter.substate.subtasks.length === 0) {
                            $scope.addResourcePi();
                        } else {
                            $scope.addSubtask();
                        }
                    }
                } else {
                    if ($scope.filter.substateStk) {
                        $scope.addResourceInSubtask();
                    } else {
                        $scope.addPayitem();
                    }
                }
            }
            if ($scope.filter.state === 'resource') {
                $scope.addResource();
            }
            if ($scope.filter.state === 'staff') {
                $scope.addStaff();
            }
        };
        PayitemService.list_payitems($stateParams.projectId).then(function (result) {
            $scope.popup_list = result;
        })
        $scope.addResource = function () {
            $scope.resourceField.resources.push({
                "id": 0,
                "resource_field_id": 0,
                "resource_id": 0,
                "position": 0,
                "name": '',
                "product_ref": '',
                "unit_id": 0,
                "unit_name": '',
                "resource_type_id": 0,
                "resource_type_name": '',
                "direct_cost": 0,
                "resource_margin": 0,
                "stage_id": 1,
                "stage_name": '',
                "vat": 0,
                "quantity": 0,
                "current_day": '',
                "total_cost": 0,
                "calculation": false,
                "open": true
            });
            $scope.filter.substate = $scope.resourceField.resources[$scope.resourceField.resources.length - 1];
        };
        $scope.addStaff = function () {
            if ($scope.staffField) {
                $scope.staffField.resources.push({
                    name: "",
                    customerId: 0,
                    employer_name: "",
                    staff_role: "",
                    product_ref: "",
                    unit_name: "",
                    direct_cost: 0.0,
                    resource_type_name: "",
                    resource_margin: 0,
                    telephone_number: "",
                    email: "",
                    safety_card_number: "",
                    expiry_date: "",
                    staff: true,
                    current_day: "",
                    start_time: $scope.filter.start,
                    break_time: $scope.filter.break,
                    finish_time: $scope.filter.finish,
                    total_time: "",
                    comment: "",
                    vat: 0.0
                })
                $scope.filter.substate = $scope.staffField.resources[ $scope.staffField.resources.length - 1];
            }
        }
        $scope.addPayitem = function () {
            $scope.payitemField.pay_items.push({
                "description": "",
                "reference": "",
                "unit": "",
                "quantity": "",
                "subtasks": [],
                "resources": []
            })
            $scope.filter.substate = $scope.payitemField.pay_items[$scope.payitemField.pay_items.length - 1]
        }
        $scope.addSubtask = function () {
            if ($scope.filter.substate && $scope.filter.substate.resources.length === 0) {
                $scope.filter.substate.subtasks.push({
                    "description": "",
                    "resources": [{
                            "open": false,
                            "resource_id": 0,
                            "position": 0,
                            "name": "",
                            "product_ref": "",
                            "unit_id": 0,
                            "unit_name": "",
                            "resource_type_id": 0,
                            "resource_type_name": "",
                            "direct_cost": 0,
                            "quantity": 0,
                            "resource_margin": 0,
                            "current_day": "",
                            "stage_id": 0,
                            "stage_name": "",
                            "calculation": true,
                            "vat": 0
                        }
                    ]
                });
                $scope.filter.substateStk = $scope.filter.substate.subtasks[$scope.filter.substate.subtasks.length - 1]
            }
        }
        $scope.addResourcePi = function () {
            if ($scope.filter.substate && $scope.filter.substate.subtasks.length === 0) {
                $scope.filter.substate.resources.push({
                    "open": false,
                    "resource_id": 0,
                    "position": 0,
                    "name": "",
                    "product_ref": "",
                    "unit_id": 0,
                    "unit_name": "",
                    "resource_type_id": 0,
                    "resource_type_name": "",
                    "direct_cost": 0,
                    "quantity": 0,
                    "resource_margin": 0,
                    "current_day": "",
                    "stage_id": 0,
                    "stage_name": "",
                    "calculation": true,
                    "vat": 0
                });
                $scope.filter.substateRes = $scope.filter.substate.resources[$scope.filter.substate.resources.length - 1]
            }
        }
        $scope.addResourceInSubtask = function () {
            if ($scope.filter.substateStk) {
                $scope.filter.substateStk.resources.push({
                    "open": false,
                    "resource_id": 0,
                    "position": 0,
                    "name": "",
                    "product_ref": "",
                    "unit_id": 0,
                    "unit_name": "",
                    "resource_type_id": 0,
                    "resource_type_name": "",
                    "direct_cost": 0,
                    "quantity": 0,
                    "resource_margin": 0,
                    "current_day": "",
                    "stage_id": 0,
                    "stage_name": "",
                    "vat": 0,
                    "calculation": true,
                });
                $scope.filter.substateStkRes = $scope.filter.substateStk.resources[$scope.filter.substateStk.resources.length - 1];
            }
        }





        $scope.imgCounter = 0;
        $scope.trim = function () {
            $scope.pictures = [];
            var i, j, temparray, chunk = 3;
            if ($scope.imgURI) {
                for (i = 0, j = $scope.imgURI.length; i < j; i += chunk) {
                    temparray = $scope.imgURI.slice(i, i + chunk);
                    $scope.pictures.push(temparray);
                }
            }
        };
        $scope.addSpot = function () {
            if ($scope.imgURI.length < 9) {
                $scope.imgURI.push({"id": $scope.imgCounter, "base64String": "", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0});
                $scope.imgCounter++;
                $scope.trim();
            }
        };
        $scope.delSpot = function (id) {
            for (var i = 0; i < $scope.imgURI.length; i++) {
                if ($scope.imgURI[i].id === id) {
                    $scope.imgURI.splice(i, 1);
                    $scope.trim();
                    break;
                }
            }
        };

        $scope.test = function (item) {
            $scope.item = item;
            $ionicModal.fromTemplateUrl('view/form/_picture_modal.html', {
                scope: $scope
            }).then(function (modal) {
                $timeout(function () {
                    $scope.picModal = modal;
                    $scope.picModal.show();
                });
            });
        };
        $scope.doShow = function () {
            $scope.picModal.hide();
            $scope.picModal.remove();
        };




        function elmYPosition(id) {
            var elm = document.getElementById(id);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent !== document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        }

        $scope.goto = function (id) {
            if (id) {
                $scope.scroll_ref = $timeout(function () { // we need little delay
                    var stopY = elmYPosition(id) - 48;
                    $ionicScrollDelegate.scrollTo(0, stopY, true);
                }, 50);
            }
        };

        $scope.repeatGroup = function (x) {
            var aux = {};
            angular.copy(x, aux);
            aux.repeatable = true;
            aux.id = 0;
            $ionicListDelegate.closeOptionButtons();
            for (var i = 0; i < aux.field_designs.length; i++) {
                aux.field_designs[i].field_group_design_id = 0;
                aux.field_designs[i].id = 0;
                if (aux.field_designs[i].option_designs) {
                    for (var j = 0; j < aux.field_designs[i].option_designs.length; j++) {
                        aux.field_designs[i].option_designs[j].id = 0;
                        aux.field_designs[i].option_designs[j].field_design_id = 0;
                    }
                }
                if (aux.field_designs[i].field_values) {
                    for (var j = 0; j < aux.field_designs[i].field_values.length; j++) {
                        aux.field_designs[i].field_values[j].id = 0;
                        aux.field_designs[i].field_values[j].field_design_id = 0;
                    }
                }
            }
            for (var i = 0; i < $scope.formData.field_group_designs.length; i++) {
                if (x === $scope.formData.field_group_designs[i]) {
                    $scope.formData.field_group_designs.splice(i + 1, 0, aux);
                    break;
                }
            }
        };

        $scope.repeatField = function (x, y) {
            var test = {};
            angular.copy(y, test);
            test.repeatable = true;
            test.id = 0;
            for (var i = 0; i < x.field_designs.length; i++) {
                if (x.field_designs[i] === y) {
                    if (x.field_designs.option_designs) {
                        for (var j = 0; j < x.field_designs.option_designs.length; j++) {
                            test.field_designs.option_designs[j].id = 0;
                        }
                    }
                    x.field_designs.splice(i + 1, 0, test);
                    break;
                }
            }
        };

        $scope.toggleGroup = function (group, id) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
            $scope.goto(id);
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

        $scope.goPicture = function () {
//            $scope.trim();
            $scope.filter.state = 'photos';
            $scope.filter.substate = 'gallery'
            $timeout(function () { // we need little delay
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
            });
        }

        $scope.testPicture = function (item) {
//            $scope.trim();
            $scope.filter.substate = 'pic';
            console.log(item)
            $scope.filter.picture = item;
            console.log($scope.imgURI)
//            console.log($scope.imgURI[item], $scope.filter.picture)
        }

        $scope.imgURI = [];
        $scope.takePicture = function () {
            var options = {
                quality: 20,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $timeout(function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Form gallery',
                        template: 'Photo added. Check form gallery for more options.'
                    });
                    $scope.imgURI.push({
                        "id": 0,
                        "base64String": imageData,
                        "comment": "",
                        "tags": "",
                        "title": " ",
                        "projectId": 0,
                        "formInstanceId": 0
                    })
                    $scope.filter.picture = $scope.imgURI[$scope.imgURI.length - 1];
                    $scope.filter.state = 'form';
                    $scope.filter.substate = null;
                });
            }, function (err) {
                // An error occured. Show a message to the user
            });
        };

        $scope.addPicture = function (index) {
//            window.imagePicker.getPictures(
//                    function (results) {
//                        $scope.convertToDataURLviaCanvas(results[0], function (base64Img) {
//                            $scope.item.base64String = base64Img.replace(/^data:image\/(png|jpg);base64,/, "");
//                        });
//                    }, function (error) {
//            }, {
//                maximumImagesCount: 1,
//                width: 800,
//                quality: 10
//            });
            var options = {
                maximumImagesCount: 1,
                quality: 20,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                correctOrientation: true,
                allowEdit: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $timeout(function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Form gallery',
                        template: 'Photo added. Check form gallery for more options.'
                    });

                    $scope.imgURI.push({
                        "id": 0,
                        "base64String": imageData,
                        "comment": "",
                        "tags": "",
                        "title": " ",
                        "projectId": 0,
                        "formInstanceId": 0
                    })
                    $scope.filter.picture = $scope.imgURI[$scope.imgURI.length - 1];
                    $scope.filter.state = 'form';
                    $scope.filter.substate = null;
                });

            }, function (err) {
                // error
            });
        };
        $scope.removePicture = function (index) {
            if ($scope.imgURI.length !== 0) {
                $scope.imgURI.splice(index, 1);
            }
        };

        $scope.convertToDataURLviaCanvas = function (url, callback) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL('image/jpg');
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        };


        $scope.actionBtnCalculation = function () {
            if ($scope.filter.substateRes) {
                $scope.filter.substateRes.calculation = !$scope.filter.substateRes.calculation;
            }
            if ($scope.filter.substateStkRes) {
                $scope.filter.substateStkRes.calculation = !$scope.filter.substateStkRes.calculation;
            }
        }
        $scope.deleteElement = function (parent, data) {
            var i = parent.indexOf(data);
            if (data.subtasks) {
                if (parent.length === 1) {
                    parent.splice(i, 1);
                    $scope.addPayitem();
                } else {
                    parent.splice(i, 1);
                }
            } else {
                if (i !== -1) {
                    parent.splice(i, 1);
                }
            }
        }



        $scope.submit = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'New form',
                template: 'Are you sure you want to submit the data?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    if ($scope.picModal) {
                        $scope.picModal.remove();
                        if ($scope.picModal) {
                            delete $scope.picModal;
                        }
                    }
                    console.log($scope)
                    $timeout(function () {
                        if ($scope.formData.resource_field_design) {
                            angular.forEach($scope.resourceField.resources, function (item) {
                                if (item.unit_obj) {
                                    item.unit_id = item.unit_obj.id;
                                    item.unit_name = item.unit_obj.name;
                                }
                                if (item.res_type_obj) {
                                    item.resource_type_id = item.res_type_obj.id;
                                    item.resource_type_name = item.res_type_obj.name;
                                }
                                if (item.stage_obj) {
                                    item.stage_id = item.stage_obj.id;
                                    item.stage_name = item.stage_obj.name;
                                }
                                if (item.absenteeism_obj) {
                                    item.abseteeism_reason_name = item.absenteeism_obj.reason;
                                }
                                if (item.current_day_obj) {
//                                            var date = new Date(item.current_day_obj);
//                                            item.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    item.current_day = item.current_day_obj;
                                }
                            });
                            ResourceService.add_field($scope.resourceField).then(function (x) {
                                $scope.formData.resource_field_id = x.id;
                                $scope.fastSave($scope.formData, $scope.imgURI);
                            });
                        }
                        if ($scope.formData.pay_item_field_design) {
                            $scope.payitemField.display_subtasks = $scope.formData.pay_item_field_design.display_subtasks;
                            $scope.payitemField.display_resources = $scope.formData.pay_item_field_design.display_resources;
                            $scope.payitemField.register_nominated = $scope.formData.pay_item_field_design.register_nominated;
                            angular.forEach($scope.payitemField.pay_items, function (item) {
                                if (item.unit_obj) {
                                    item.unit = item.unit_obj.name;
                                    item.unit_id = item.unit_obj.id;
                                }
                                angular.forEach(item.resources, function (res) {
                                    if (res.unit_obj) {
                                        res.unit_id = res.unit_obj.id;
                                        res.unit_name = res.unit_obj.name;
                                    }
                                    if (res.res_type_obj) {
                                        res.resource_type_id = res.res_type_obj.id;
                                        res.resource_type_name = res.res_type_obj.name;
                                    }
                                    if (res.absenteeism_obj) {
                                        res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                    }
                                    if (res.current_day_obj) {
//                                                var date = new Date(res.current_day_obj);
//                                                res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        res.current_day = res.current_day_obj;
                                    }
                                    if (res.expiry_date_obj) {
                                        var date = new Date(res.expiry_date_obj);
                                        res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    }
                                });
                                angular.forEach(item.subtasks, function (subtask) {
                                    angular.forEach(subtask.resources, function (res) {
                                        if (res.unit_obj) {
                                            res.unit_id = res.unit_obj.id;
                                            res.unit_name = res.unit_obj.name;
                                        }
                                        if (res.res_type_obj) {
                                            res.resource_type_id = res.res_type_obj.id;
                                            res.resource_type_name = res.res_type_obj.name;
                                        }
                                        if (res.absenteeism_obj) {
                                            res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                        }
                                        if (res.current_day_obj) {
//                                                    var date = new Date(res.current_day_obj);
//                                                    res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                            res.current_day = res.current_day_obj;
                                        }
                                        if (res.expiry_date_obj) {
                                            var date = new Date(res.expiry_date_obj);
                                            res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        }
                                    });
                                });
                            });
                            PayitemService.add_field($scope.payitemField).then(function (x) {
                                $scope.formData.pay_item_field_id = x.id;
                                $scope.fastSave($scope.formData, $scope.imgURI);
                            });
                        }
                        if ($scope.formData.scheduling_field_design) {
                            $scope.payitemField.display_subtasks = $scope.formData.scheduling_field_design.display_subtasks;
                            $scope.payitemField.display_resources = $scope.formData.scheduling_field_design.display_resources;
                            $scope.payitemField.register_nominated = $scope.formData.scheduling_field_design.register_nominated;
                            angular.forEach($scope.payitemField.pay_items, function (item) {
                                if (item.unit_obj) {
                                    item.unit = item.unit_obj.name;
                                    item.unit_id = item.unit_obj.id;
                                }
                                angular.forEach(item.resources, function (res) {
                                    if (res.unit_obj) {
                                        res.unit_id = res.unit_obj.id;
                                        res.unit_name = res.unit_obj.name;
                                    }
                                    if (res.res_type_obj) {
                                        res.resource_type_id = res.res_type_obj.id;
                                        res.resource_type_name = res.res_type_obj.name;
                                    }
                                    if (res.absenteeism_obj) {
                                        res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                    }
                                    if (res.current_day_obj) {
//                                                var date = new Date(res.current_day_obj);
//                                                res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        res.current_day = res.current_day_obj;
                                    }
                                    if (res.expiry_date_obj) {
                                        var date = new Date(res.expiry_date_obj);
                                        res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    }
                                });
                                angular.forEach(item.subtasks, function (subtask) {
                                    angular.forEach(subtask.resources, function (res) {
                                        if (res.unit_obj) {
                                            res.unit_id = res.unit_obj.id;
                                            res.unit_name = res.unit_obj.name;
                                        }
                                        if (res.res_type_obj) {
                                            res.resource_type_id = res.res_type_obj.id;
                                            res.resource_type_name = res.res_type_obj.name;
                                        }
                                        if (res.absenteeism_obj) {
                                            res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                        }
                                        if (res.current_day_obj) {
//                                    item.current_day = item.current_day_obj.getDate() + '-' + (item.current_day_obj.getMonth() + 1) + '-' + item.current_day_obj.getFullYear();
                                            res.current_day = res.current_day_obj.getTime();
                                        }
                                        if (res.expiry_date_obj) {
                                            var date = new Date(res.expiry_date_obj);
                                            res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        }
                                    });
                                });
                            });
                            SchedulingService.add_field($scope.payitemField).then(function (x) {
                                $scope.formData.scheduling_field_id = x.id;
                                $scope.fastSave($scope.formData, $scope.imgURI);
                            });
                        }
                        if ($scope.formData.staff_field_design) {
                            angular.forEach($scope.staffField.resources, function (item) {
                                if (item.res_type_obj) {
                                    item.resource_type_id = item.res_type_obj.id;
                                    item.resource_type_name = item.res_type_obj.name;
                                }
                                if (item.absenteeism_obj) {
                                    item.abseteeism_reason_name = item.absenteeism_obj.reason;
                                    item.absenteeism_obj.reason;
                                }
                                if (item.current_day_obj) {
//                                    item.current_day = item.current_day_obj.getDate() + '-' + (item.current_day_obj.getMonth() + 1) + '-' + item.current_day_obj.getFullYear();
                                    item.current_day = item.current_day_obj.getTime();
                                }
                                if (item.expiry_date_obj) {
//                                    item.expiry_date = item.expiry_date_obj.getDate() + '-' + (item.expiry_date_obj.getMonth() + 1) + '-' + item.expiry_date_obj.getFullYear();
                                    item.expiry_date = item.expiry_date_obj.getFullYear() + '-' + (item.expiry_date_obj.getMonth() + 1) + '-' + item.expiry_date_obj.getDate();
                                }
                                if (item.start_time_obj) {
                                    item.start_time = item.start_time_obj.getHours() + ':' + item.start_time_obj.getMinutes();
                                }
                                if (item.break_time_obj) {
                                    item.break_time = item.break_time_obj.getHours() + ':' + item.break_time_obj.getMinutes();
                                }
                                if (item.finish_time_obj) {
                                    item.finish_time = item.finish_time_obj.getHours() + ':' + item.finish_time_obj.getMinutes();
                                }
                            });
                            console.log($scope.staffField)
                            StaffService.add_field($scope.staffField).then(function (x) {
                                $scope.formData.staff_field_id = x.id;
                                $scope.fastSave($scope.formData, $scope.imgURI);
                            });
                        }
                        if (!$scope.formData.resource_field_design && !$scope.formData.scheduling_field_design && !$scope.formData.pay_item_field_design && !$scope.formData.staff_field_design) {
                            $scope.fastSave($scope.formData, $scope.imgURI);
                        }
                    });
                }

            });
        };

        $scope.fastSave = function (datax, img) {
            var formUp = $ionicPopup.alert({
                title: "Submitting",
                template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                content: "",
                buttons: []
            });
            FormInstanceService.create(datax, img).then(
                    function successCallback(data) {
                        if (data && data.data && data.data.message) {
                            $timeout(function () {
                                formUp.close();
                                $timeout(function () {
                                    var alertPopup3 = $ionicPopup.alert({
                                        title: 'Submision failed.',
                                        template: 'You have not permission to do this operation'
                                    });
                                    alertPopup3.then(function (res) {
                                        $rootScope.$broadcast('sync.todo');
                                    });
                                });
                            });
                        } else {
                            if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                $rootScope.formId = data.id;
                                if (!data.message && data.status !== 0) {
                                    FormInstanceService.get($rootScope.formId).then(function (data) {
                                        $rootScope.rootForm = data;
                                        formUp.close();
                                        $state.go('app.formInstance', {'projectId': $rootScope.projectId, 'type': 'form', 'formId': data.id});
                                    });
                                }
                            } else {
                                if (data && data.status === 400) {
                                    $timeout(function () {
                                        formUp.close();
                                        $timeout(function () {
                                            var alertPopup2 = $ionicPopup.alert({
                                                title: 'Submision failed.',
                                                template: 'Incorrect data, try again'
                                            });
                                            alertPopup2.then(function (res) {
                                            });
                                        });
                                    });
                                } else {
                                    $timeout(function () {
                                        formUp.close();
                                        $timeout(function () {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Submision failed.',
                                                template: 'You are offline. Submit forms by syncing next time you are online'
                                            }).then(function (res) {
                                                $state.go('app.forms', {'projectId': $rootScope.projectId, 'categoryId': $scope.formData.category_id});
                                            });
                                        });
                                    });
                                }

                            }
                        }
                    });
        }


    }
]);

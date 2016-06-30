angular.module($APP.name).controller('FormInstanceCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'FormInstanceService',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    'ResourceService',
    'StaffService',
    'SchedulingService',
    'PayitemService',
    '$ionicPopup',
    'ShareService',
    '$ionicScrollDelegate',
    'SecuredPopups',
    '$timeout',
    '$state',
    function ($scope, $rootScope, $stateParams, $location, FormInstanceService, $ionicSideMenuDelegate, $ionicHistory, ResourceService, StaffService, SchedulingService, PayitemService, $ionicPopup, ShareService, $ionicScrollDelegate, SecuredPopups, $timeout, $state) {
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });

        $scope.linkAux = 'forms';

        $scope.updateTitle = function (title, placeholder) {
            if (title) {
                if (placeholder === 'Scheduling') {
                    $scope.titleShow = 'Scheduling: ' + title;
                }
                if (placeholder === 'Scheduling Subtask') {
                    $scope.titleShow = 'Scheduling Subtask: ' + title;
                }
                if (placeholder === 'Scheduling Subtask') {
                    $scope.titleShow = 'Scheduling Subtask: ' + title;
                }
                if (placeholder === 'Scheduling Subtask Resource') {
                    $scope.titleShow = 'Scheduling Subtask Resource: ' + title;
                }
                if (placeholder === 'Scheduling Resource') {
                    $scope.titleShow = 'Scheduling Resource: ' + title;
                }
                if (placeholder === 'Pay-item') {
                    $scope.titleShow = 'Pay-item: ' + title;
                }
                if (placeholder === 'Pay-item Subtask') {
                    $scope.titleShow = 'Pay-item Subtask: ' + title;
                }
                if (placeholder === 'Pay-item Subtask') {
                    $scope.titleShow = 'Pay-item Subtask: ' + title;
                }
                if (placeholder === 'Pay-item Subtask Resource') {
                    $scope.titleShow = 'Pay-item Subtask Resource: ' + title;
                }
                if (placeholder === 'Pay-item Resource') {
                    $scope.titleShow = 'Pay-item Resource: ' + title;
                }
            } else {
                $scope.titleShow = placeholder;
            }
        }

        $scope.backHelper = function () {
            console.log($scope.linkAux)
            switch ($scope.linkAux) {
                case 'forms':
                    $scope.back();
                    break;
                case 'photos':
                    $scope.filter.substate = null;
                    $scope.filter.state = 'form';
                    $scope.linkAux = 'forms';
                    break;
                case 'photodetails':
                    $scope.filter.substate = 'gallery';
                    $scope.linkAux = 'photos';
                    break;
                case 'resource':
                    $scope.filter.state = 'resource';
                    $scope.filter.substate = null;
                    $scope.linkAux = 'resources';
                    break;
                case 'resources':
                    $scope.filter.state = 'form';
                    $scope.linkAux = 'forms';
                    break;
                case 'staff':
                    $scope.filter.state = 'staff';
                    $scope.filter.substate = null;
                    $scope.linkAux = 'staffs';
                    break;
                case 'staffs':
                    $scope.filter.state = 'form';
                    $scope.linkAux = 'forms';
                    break;
                case 'scheduling':
                    if ($scope.filter.substate) {
                        $scope.filter.state = 'scheduling';
                        $scope.filter.substateStkRes = null;
                        $scope.filter.substateStk = null;
                        $scope.filter.substateRes = null;
                        $scope.filter.substate = null;
                        $scope.titleShow = 'Schedulings';
                        $scope.linkAux = 'schedulings';
                    }
                    else {
                        $scope.filter.state = 'form';
                        $scope.linkAux = 'forms';
                        $scope.titleShow = $scope.formData.name;
                    }
                    break;
                case 'schedulings':
                    $scope.filter.state = 'form';
                    $scope.linkAux = 'forms';
                    $scope.titleShow = $scope.formData.name;
                    break;
                case 'schedulingStk':
                    $scope.filter.state = 'scheduling';
                    $scope.filter.substateStk = null;
                    $scope.linkAux = 'scheduling';
                    if ($scope.filter.substate.description) {
                        $scope.titleShow = 'Scheduling: ' + $scope.filter.substate.description;
                    } else {
                        $scope.titleShow = 'Scheduling';
                    }
                    break;
                case 'schedulingSubRes':
                    $scope.filter.state = 'scheduling';
                    $scope.filter.actionBtnShow = true;
                    $scope.filter.substateStkRes = null;
                    $scope.linkAux = 'schedulingStk';
                    if ($scope.filter.substateStk.description) {
                        $scope.titleShow = 'Scheduling Subtaks: ' + $scope.filter.substateStk.description;
                    } else {
                        $scope.titleShow = 'Scheduling Subtaks';
                    }
                    break;
                case 'schedulingRes':
                    $scope.filter.state = 'scheduling';
                    $scope.filter.actionBtnShow = true;
                    $scope.filter.substateRes = null;
                    $scope.linkAux = 'scheduling';
                    if ($scope.filter.substate.description) {
                        $scope.titleShow = 'Scheduling:' + $scope.filter.substate.description;
                    } else {
                        $scope.titleShow = 'Scheduling';
                    }
                    break;
                case 'payitem':
                    if ($scope.filter.substate) {
                        $scope.filter.state = 'payitem';
                        $scope.filter.substateStkRes = null;
                        $scope.filter.substateStk = null;
                        $scope.filter.substateRes = null;
                        $scope.filter.substate = null;
                        $scope.titleShow = 'Pay-items';
                        $scope.linkAux = 'payitems';
                    }
                    else {
                        $scope.filter.state = 'form';
                        $scope.linkAux = 'forms';
                        $scope.titleShow = $scope.formData.name;
                    }
                    break;
                case 'payitems':
                    $scope.filter.state = 'form';
                    $scope.linkAux = 'forms';
                    $scope.titleShow = $scope.formData.name;
                    break;
                case 'payitemStk':
                    $scope.filter.state = 'payitem';
                    $scope.filter.substateStk = null;
                    $scope.linkAux = 'payitem';
                    if ($scope.filter.substate.description) {
                        $scope.titleShow = 'Pay-item: ' + $scope.filter.substate.description;
                    } else {
                        $scope.titleShow = 'Pay-item';
                    }
                    break;
                case 'payitemSubRes':
                    $scope.filter.state = 'payitem';
                    $scope.filter.actionBtnShow = true;
                    $scope.filter.substateStkRes = null;
                    $scope.linkAux = 'payitemStk';
                    if ($scope.filter.substateStk.description) {
                        $scope.titleShow = 'Pay-item Subtaks: ' + $scope.filter.substateStk.description;
                    } else {
                        $scope.titleShow = 'Pay-item Subtaks';
                    }
                    break;
                case 'payitemRes':
                    $scope.filter.state = 'payitem';
                    $scope.filter.actionBtnShow = true;
                    $scope.filter.substateRes = null;
                    $scope.linkAux = 'payitem';
                    if ($scope.filter.substate.description) {
                        $scope.titleShow = 'Pay-item:' + $scope.filter.substate.description;
                    } else {
                        $scope.titleShow = 'Pay-item';
                    }
                    break;
            }
        };
        $scope.goStateDown = function (state, substate, data) {
            console.log(state, substate)
            if (state === 'scheduling') {
                switch (substate) {
                    case 'subtask':
                        $scope.filter.state = state;
                        $scope.linkAux = 'schedulingStk';
                        if (data.description) {
                            $scope.titleShow = 'Scheduling Subtask: ' + data.description;
                        } else {
                            $scope.titleShow = 'Scheduling Subtask';
                        }
                        $scope.filter.substateStk = data;
                        break;
                    case 'subres':
                        $scope.filter.actionBtnShow = false;
                        $scope.filter.state = state;
                        $scope.linkAux = 'schedulingSubRes';
                        if (data.name) {
                            $scope.titleShow = 'Scheduling Subtask Resource: ' + data.name;
                        } else {
                            $scope.titleShow = 'Scheduling Subtask Resource';
                        }
                        $scope.filter.substateStkRes = data;
                        break;
                    case 'res':
                        $scope.filter.actionBtnShow = false;
                        $scope.filter.state = state;
                        $scope.linkAux = 'schedulingRes';
                        if (data.name) {
                            console.log(data.name)
                            $scope.titleShow = 'Scheduling Resource: ' + data.name;
                        } else {
                            console.log('wut?')
                            $scope.titleShow = 'Scheduling Resource';
                        }
                        $scope.filter.substateRes = data;
                        break;
                }
            }
            if (state === 'payitem') {
                switch (substate) {
                    case 'subtask':
                        $scope.filter.state = state;
                        $scope.linkAux = 'payitemStk';
                        if (data.description) {
                            $scope.titleShow = 'Pay-item Subtask: ' + data.description;
                        } else {
                            $scope.titleShow = 'Pay-item Subtask';
                        }
                        $scope.filter.substateStk = data;
                        break;
                    case 'subres':
                        $scope.filter.actionBtnShow = false;
                        $scope.filter.state = state;
                        $scope.linkAux = 'payitemSubRes';
                        if (data.name) {
                            $scope.titleShow = 'Pay-item Subtask Resource: ' + data.name;
                        } else {
                            $scope.titleShow = 'Pay-item Subtask Resource';
                        }
                        $scope.filter.substateStkRes = data;
                        break;
                    case 'res':
                        $scope.filter.actionBtnShow = false;
                        $scope.filter.state = state;
                        $scope.linkAux = 'payitemRes';
                        if (data.name) {
                            console.log(data.name)
                            $scope.titleShow = 'Pay-item Resource: ' + data.name;
                        } else {
                            $scope.titleShow = 'Pay-item Resource';
                        }
                        $scope.filter.substateRes = data;
                        break;
                }
            }
        }
        $scope.goState = function (state, substate) {
            switch (state) {
                case 'resource':
                    $scope.filter.state = state;
                    if (substate || $scope.filter.substate) {
                        if (substate) {
                            $scope.filter.substate = substate;
                        }
                        $scope.linkAux = 'resource';
                        if ($scope.filter.substate.name) {
                            $scope.titleShow = 'Resource: ' + $scope.filter.substate.name;
                        } else {
                            $scope.titleShow = 'Resource';
                        }
                    } else {
                        $scope.linkAux = 'resources';
                        $scope.titleShow = 'Resources';
                    }
                    break;
                case 'staff':
                    $scope.filter.state = state;
                    if (substate || $scope.filter.substate) {
                        if (substate) {
                            $scope.filter.substate = substate;
                        }
                        $scope.linkAux = 'staff';
                        if ($scope.filter.substate.nme) {
                            $scope.titleShow = 'Staff: ' + $scope.filter.substate.name;
                        } else {
                            $scope.titleShow = 'Staff';
                        }
                    } else {
                        $scope.linkAux = 'staffs';
                        $scope.titleShow = 'Staffs';
                    }
                    break;
                case 'scheduling':
                    $scope.filter.state = state;
                    if (substate || $scope.filter.substate) {
                        if (substate) {
                            $scope.filter.substate = substate;
                        }
                        if ($scope.filter.substate.description) {
                            $scope.titleShow = 'Scheduling: ' + $scope.filter.substate.description;
                        } else {
                            $scope.titleShow = 'Scheduling';
                        }
                        $scope.linkAux = 'scheduling';
                    } else {
                        $scope.linkAux = 'schedulings';
                        $scope.titleShow = 'Schedulings';
                    }
                    break;
                case 'payitem':
                    $scope.filter.state = state;
                    if (substate || $scope.filter.substate) {
                        if (substate) {
                            $scope.filter.substate = substate;
                        }
                        if ($scope.filter.substate.description) {
                            $scope.titleShow = 'Pay-item: ' + $scope.filter.substate.description;
                        } else {
                            $scope.titleShow = 'Pay-item';
                        }
                        $scope.linkAux = 'payitem';
                    } else {
                        $scope.linkAux = 'payitem';
                        $scope.titleShow = 'Pay-items';
                    }
                    console.log($scope.linkAux)
                    break;
            }
        }

        $scope.doTotal = function (predicate, data) {
            if (predicate === 'payitem') {
                data.total_cost = 0;
                angular.forEach(data.pay_items, function (item) {
                    item.total_cost = 0;
                    if (item.resources.length !== 0) {
                        angular.forEach(item.resources, function (res) {
                            if (!isNaN(res.quantity) && !isNaN(res.direct_cost)) {
                                res.total_cost = res.quantity * res.direct_cost;
                                item.total_cost = item.total_cost + res.total_cost;
                            }
                        })
                    }
                    if (item.subtasks.length !== 0) {
                        angular.forEach(item.subtasks, function (stk) {
                            stk.total_cost = 0;
                            angular.forEach(stk.resources, function (res) {
                                if (!isNaN(res.quantity) && !isNaN(res.direct_cost)) {
                                    res.total_cost = res.quantity * res.direct_cost;
                                    stk.total_cost = stk.total_cost + res.total_cost;
                                }
                            })
                            if (!isNaN(stk.total_cost)) {
                                item.total_cost = item.total_cost + stk.total_cost;
                            }
                        })
                    }
                    data.total_cost = data.total_cost + item.total_cost;
                })
            }
        }

        $scope.filter = {
            state: 'form',
            edit: false
        }

        $scope.isLoaded = false;
        $scope.hasData = false;
        $scope.formData = $rootScope.rootForm;
        $rootScope.slideHeader = false;
        $rootScope.slideHeaderPrevious = 0;
        $rootScope.slideHeaderHelper = false;

        FormInstanceService.get($rootScope.formId).then(function (data) {
            $rootScope.formData = data;
            $scope.formData = data;
            $scope.titleShow = $scope.formData.name;
            if (data.resource_field_id) {
                ResourceService.get_field(data.resource_field_id).then(function (res) {
                    $scope.resourceField = res;
                    angular.forEach($scope.resourceField.resources, function (item) {
                        if (item.unit_id) {
                            angular.forEach($rootScope.unit_list, function (unt) {
                                if (unt.id === item.unit_id) {
                                    item.unit_obj = unt;
                                }
                            })
                        }
                        if (item.resource_type_id) {
                            angular.forEach($rootScope.resource_type_list, function (res) {
                                if (res.id === item.resource_type_id) {
                                    item.res_type_obj = res;
                                }
                            })
                        }
                        if (item.abseteeism_reason_name) {
                            angular.forEach($rootScope.abs_list, function (abs) {
                                if (abs.reason === item.abseteeism_reason_name) {
                                    item.absenteeism_obj = abs;
                                }
                            })
                        }
                        if (item.current_day) {
                            var partsOfStr = item.current_day.split('-');
                            console.log(partsOfStr)
                            item.current_day_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                            item.current_day_obj = item.current_day;
                        }
                    });
                    $rootScope.resourceField = $scope.resourceField;
                });
            }
            if (data.staff_field_id) {
                StaffService.get_field(data.staff_field_id).then(function (res) {
                    $scope.staffField = res;
                    angular.forEach($scope.staffField.resources, function (item) {
                        if (item.unit_id) {
                            angular.forEach($rootScope.unit_list, function (unt) {
                                if (unt.id === item.unit_id) {
                                    item.unit_obj = unt;
                                }
                            })
                        }
                        if (item.resource_type_name) {
                            angular.forEach($rootScope.resource_type_list, function (res) {
                                if (res.name === item.resource_type_name) {
                                    item.res_type_obj = res;
                                }
                            })
                        }
                        if (item.abseteeism_reason_name) {
                            angular.forEach($rootScope.abs_list, function (abs) {
                                if (abs.reason === item.abseteeism_reason_name) {
                                    item.absenteeism_obj = abs;
                                }
                            })
                        }
                        if (item.current_day) {
                            var partsOfStr = item.current_day.split('-');
                            console.log(partsOfStr)
                            item.current_day_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                            item.current_day_obj = item.current_day;
                        }
                        if (item.expiry_date) {
                            var partsOfStr = item.expiry_date.split('-');
                            console.log(partsOfStr)
                            item.expiry_date_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                            item.expiry_date_obj = item.expiry_date;
                        }
                    });
                    $rootScope.staffField = $scope.staffField;
                });
            }
            if (data.scheduling_field_id) {
                SchedulingService.get_field(data.scheduling_field_id).then(function (res) {
                    $scope.payitemField = res;
                    angular.forEach($scope.payitemField.pay_items, function (item) {
                        if (item.unit_id) {
                            angular.forEach($rootScope.unit_list, function (unt) {
                                if (unt.id === item.unit_id) {
                                    item.unit_obj = unt;
                                }
                            })
                        }
                        angular.forEach(item.resources, function (res) {
                            if (res.unit_id) {
                                angular.forEach($rootScope.unit_list, function (unt) {
                                    if (unt.id === res.unit_id) {
                                        res.unit_obj = unt;
                                    }
                                })
                            }
                            if (res.resource_type_name) {
                                angular.forEach($rootScope.resource_type_list, function (rest) {
                                    if (rest.name === res.resource_type_name) {
                                        res.res_type_obj = rest;
                                    }
                                })
                            }
                            if (res.abseteeism_reason_name) {
                                angular.forEach($rootScope.abs_list, function (abs) {
                                    if (abs.reason === res.abseteeism_reason_name) {
                                        res.absenteeism_obj = abs;
                                    }
                                })
                            }
                            if (res.current_day) {
                                var partsOfStr = res.current_day.split('-');
                                console.log(partsOfStr)
                                item.current_day_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                                res.current_day_obj = res.current_day;
                            }
                            if (res.expiry_date) {
                                var partsOfStr = res.expiry_date.split('-');
                                console.log(partsOfStr)
                                item.expiry_date_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                                res.expiry_date_obj = res.expiry_date;
                            }
                        });
                        angular.forEach(item.subtasks, function (subtask) {
                            angular.forEach(subtask.resources, function (res) {
                                if (res.unit_id) {
                                    angular.forEach($rootScope.unit_list, function (unt) {
                                        if (unt.id === res.unit_id) {
                                            res.unit_obj = unt;
                                        }
                                    })
                                }
                                if (res.resource_type_name) {
                                    angular.forEach($rootScope.resource_type_list, function (rest) {
                                        if (rest.name === res.resource_type_name) {
                                            res.res_type_obj = rest;
                                        }
                                    })
                                }
                                if (res.abseteeism_reason_name) {
                                    angular.forEach($rootScope.abs_list, function (abs) {
                                        if (abs.reason === res.abseteeism_reason_name) {
                                            res.absenteeism_obj = abs;
                                        }
                                    })
                                }
                                if (res.current_day) {
                                    var partsOfStr = res.current_day.split('-');
                                    console.log(partsOfStr)
                                    item.current_day_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
                                    res.current_day_obj = res.current_day;
                                }
                                if (res.expiry_date) {
                                    var partsOfStr = res.expiry_date.split('-');
                                    console.log(partsOfStr)
                                    item.expiry_date_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
                                    res.expiry_date_obj = res.expiry_date;
                                }
                            });
                        });
                    });
                    $rootScope.payitemField = $scope.payitemField;
                });
            }
            if (data.pay_item_field_id) {
                PayitemService.get_field(data.pay_item_field_id).then(function (res) {
                    $scope.payitemField = res;
                    $scope.doTotal('payitem', $scope.payitemField)
                    angular.forEach($scope.payitemField.pay_items, function (item) {
                        if (item.unit_id) {
                            angular.forEach($rootScope.unit_list, function (unt) {
                                if (unt.id === item.unit_id) {
                                    item.unit_obj = unt;
                                }
                            })
                        }
                        angular.forEach(item.resources, function (res) {
                            if (res.unit_id) {
                                angular.forEach($rootScope.unit_list, function (unt) {
                                    if (unt.id === res.unit_id) {
                                        res.unit_obj = unt;
                                    }
                                })
                            }
                            if (res.resource_type_name) {
                                angular.forEach($rootScope.resource_type_list, function (rest) {
                                    if (rest.name === res.resource_type_name) {
                                        res.res_type_obj = rest;
                                    }
                                })
                            }
                            if (res.abseteeism_reason_name) {
                                angular.forEach($rootScope.abs_list, function (abs) {
                                    if (abs.reason === res.abseteeism_reason_name) {
                                        res.absenteeism_obj = abs;
                                    }
                                })
                            }
                            if (res.current_day) {
                                var partsOfStr = res.current_day.split('-');
                                console.log(partsOfStr)
                                item.current_day_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                                res.current_day_obj = res.current_day;
                            }
                            if (res.expiry_date) {
                                var partsOfStr = res.expiry_date.split('-');
                                console.log(partsOfStr)
                                item.expiry_date_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                                res.expiry_date_obj = res.expiry_date;
                            }
                        });
                        angular.forEach(item.subtasks, function (subtask) {
                            angular.forEach(subtask.resources, function (res) {
                                if (res.unit_id) {
                                    angular.forEach($rootScope.unit_list, function (unt) {
                                        if (unt.id === res.unit_id) {
                                            res.unit_obj = unt;
                                        }
                                    })
                                }
                                if (res.resource_type_name) {
                                    angular.forEach($rootScope.resource_type_list, function (rest) {
                                        if (rest.name === res.resource_type_name) {
                                            res.res_type_obj = rest;
                                        }
                                    })
                                }
                                if (res.abseteeism_reason_name) {
                                    angular.forEach($rootScope.abs_list, function (abs) {
                                        if (abs.reason === res.abseteeism_reason_name) {
                                            res.absenteeism_obj = abs;
                                        }
                                    })
                                }
                                if (res.current_day) {
                                    var partsOfStr = res.current_day.split('-');
                                    console.log(partsOfStr)
                                    item.current_day_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                                    res.current_day_obj = res.current_day;
                                }
                                if (res.expiry_date) {
                                    var partsOfStr = res.expiry_date.split('-');
                                    console.log(partsOfStr)
                                    item.expiry_date_obj = new Date(partsOfStr[0], parseInt(partsOfStr[1]) - 1, partsOfStr[2])
//                                    res.expiry_date_obj = res.expiry_date;
                                }
                            });
                        });
                    });
                    $rootScope.payitemField = $scope.payitemField;
                });
            }
        });

        if ($scope.formData) {
            if ($scope.formData.length !== 0) {
                $scope.hasData = true;
            }
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

        $scope.getFullCode = function (row) {
            if (row.revision !== '0') {
                return row.code + '-' + row.form_number + '-Rev' + row.revision;
            } else {
                return row.code + '-' + row.form_number;
            }
        };
        $scope.importContact = function (id) {
            $timeout(function () {
                navigator.contacts.pickContact(function (contact) {
                    if (contact.emails) {
                        $scope.filter.email = contact.emails[0].value;
                        $timeout(function () {
                            var alertPopupA = SecuredPopups.show('alert', {
                                template: '<input type="email" ng-model="filter.email">',
                                title: 'Share form',
                                subTitle: 'Please insert an email address',
                                scope: $scope,
                                buttons: [
                                    {text: '<i class="ion-person-add"></i>',
                                        onTap: function (e) {
                                            $scope.importContact(id);
                                        }
                                    },
                                    {text: 'Cancel'},
                                    {
                                        text: 'Send',
                                        type: 'button-positive',
                                        onTap: function (e) {
                                            if ($scope.filter.email) {
                                                var alertPopupB = SecuredPopups.show('alert', {
                                                    title: "Sending email",
                                                    template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                                                    content: "",
                                                    buttons: []
                                                });
                                                ShareService.form.create(id, $scope.filter.email).then(function (response) {
                                                    alertPopupB.close();
                                                    if (response.message === "Form shared") {
                                                        $scope.filter.email = "";
                                                        var alertPopupC = SecuredPopups.show('alert', {
                                                            title: 'Share',
                                                            template: 'Email sent.'
                                                        });
                                                    } else {
                                                        $scope.filter.email = "";
                                                        var alertPopupC = SecuredPopups.show('alert', {
                                                            title: 'Share',
                                                            template: 'Form already shared to this user.'
                                                        });
                                                    }
                                                });

                                            } else {
                                                var alertPopupC = SecuredPopups.show('alert', {
                                                    title: 'Share',
                                                    template: 'Please insert a valid value for email.'
                                                });
                                            }
                                        }
                                    }
                                ]
                            });
                        });
                    }
                }, function (err) {
                });
            });
        }
        $scope.shareThis = function (predicate) {
            var alertPopupA = SecuredPopups.show('alert', {
                template: '<input type="email" ng-model="filter.email">',
                title: 'Share form',
                subTitle: 'Please insert an email address',
                scope: $scope,
                buttons: [
                    {text: '<i class="ion-person-add"></i>',
                        onTap: function (e) {
                            $scope.importContact(predicate.id);
                        }
                    },
                    {text: 'Cancel'},
                    {
                        text: 'Send',
                        type: 'button-positive',
                        onTap: function (e) {
                            if ($scope.filter.email) {
                                var alertPopupB = SecuredPopups.show('alert', {
                                    title: "Sending email",
                                    template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                                    content: "",
                                    buttons: []
                                });
                                ShareService.form.create(predicate.id, $scope.filter.email).then(function (response) {
                                    alertPopupB.close();
                                    if (response.message === "Form shared") {
                                        $scope.filter.email = "";
                                        var alertPopupC = SecuredPopups.show('alert', {
                                            title: 'Share',
                                            template: 'Email sent.'
                                        });
                                    } else {
                                        $scope.filter.email = "";
                                        var alertPopupC = SecuredPopups.show('alert', {
                                            title: 'Share',
                                            template: 'Form already shared to this user.'
                                        });
                                    }
                                });
                            } else {
                                var alertPopupC = SecuredPopups.show('alert', {
                                    title: 'Share',
                                    template: 'Please insert a valid value for email.'
                                });
                            }
                        }
                    }
                ]
            });
        };

        $scope.goToTop = function () {
            $timeout(function () { // we need little delay
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
            });
        }

    }
]);
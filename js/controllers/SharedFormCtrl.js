angular.module($APP.name).controller('SharedFormCtrl', [
    '$rootScope',
    '$scope',
    'FormInstanceService',
    'ShareService',
    'ResourceService',
    'StaffService',
    'SchedulingService',
    'PayitemService',
    '$stateParams',
    function ($rootScope, $scope, FormInstanceService, ShareService, ResourceService, StaffService, SchedulingService, PayitemService, $stateParams) {

        $scope.filter = {
            state: 'form',
            edit: false,
            shared: true

        }

        ShareService.comment.list($stateParams.formId).then(function (result) {
            $scope.commentList = result;
        })
        $scope.back = function () {
            delete $scope.formData;
        }
        $scope.sendComment = function () {
            var aux = {
                "id": 0,
                "shared_form_id": $stateParams.id,
                "user_id": 0,
                "comment": $scope.filter.comment
            }
            console.log(aux)
            ShareService.comment.create(aux).then(function (result) {
                $scope.filter.comment = '';
                ShareService.comment.list($stateParams.formId).then(function (result) {
                    $scope.commentList = result;
                })
            })
        }

        FormInstanceService.get($stateParams.formId).then(function (data) {
            $scope.formData = data;
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
        })
    }
]);




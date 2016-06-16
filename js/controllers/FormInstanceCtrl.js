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
    function ($scope, $rootScope, $stateParams, $location, FormInstanceService, $ionicSideMenuDelegate, $ionicHistory, ResourceService, StaffService, SchedulingService, PayitemService, $ionicPopup, ShareService, $ionicScrollDelegate, SecuredPopups, $timeout) {
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });

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
                    {text: 'Cancel' },
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
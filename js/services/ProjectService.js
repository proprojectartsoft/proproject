angular.module($APP.name).factory('ProjectService', [
    '$http',
    'CacheFactory',
    function ($http, CacheFactory) {
        return {
            list: function () {
                return $http.get($APP.server + '/api/project', {}).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            list_current: function (active) {
                return $http.get($APP.server + '/api/project/list', {
                    params: {active: active}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            settings: function (project_id) {
                return $http.get($APP.server + '/api/projectsettings', {
                    params: {project_id: project_id}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            clearProjCache: function () {
                var projectsCache = CacheFactory.get('projectsCache');
                if (!projectsCache || projectsCache.length === 0) {
                    projectsCache = CacheFactory('projectsCache');
                    projectsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                var list = projectsCache.keys();
                for (var i = 0; i < list.length; i++) {
                    projectsCache.remove(list[i]);
                }
            }

        };
    }
]);
angular.module($APP.name).directive('percentageField', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                // currencyIncludeDecimals: '&',

            },
            link: function (scope, element, attr, ngModel) {

                attr[ 'percentageMaxValue' ] = attr[ 'percentageMaxValue' ] || 100;
                attr[ 'percentageMaxDecimals' ] = attr[ 'percentageMaxDecimals' ] || 2;


                // function called when parsing the inputted url
                // this validation may not be rfc compliant, but is more
                // designed to catch common url input issues.
                function into(input) {

                    var valid;

                    if (input == '')
                    {
                        ngModel.$setValidity('valid', true);
                        return '';
                    }

//                    // if the user enters something that's not even remotely a number, reject it
//                    if (!input.match(/^\d+(\.\d+){0,1}%{0,1}$/gi))
//                    {
//                        ngModel.$setValidity('valid', false);
//                        return '';
//                    }
//
//                    // strip everything but numbers from the input
//                    input = input.replace(/[^0-9\.]/gi, '');
//
                    input = parseFloat(input);

                    var power = Math.pow(10, attr[ 'percentageMaxDecimals' ]);

                    input = Math.round(input * power) / power;

                    if (input > attr[ 'percentageMaxValue' ])
                        input = attr[ 'percentageMaxValue' ];

                    // valid!
                    ngModel.$setValidity('valid', true);

                    return input;
                }

                ngModel.$parsers.push(into);

                function out(input)
                {
                    if (ngModel.$valid && input !== undefined && input > '')
                    {
                        return input + '%';
                    }

                    return '';
                }

                ngModel.$formatters.push(out);

                $(element).bind('click', function () {
                    //$( element ).val( ngModel.$modelValue );
                    $(element).select();
                });

                $(element).bind('blur', function () {
                    $(element).val(out(ngModel.$modelValue));
                });
            }
        };
    }]);
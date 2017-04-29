angular.module('angularLab2Application', ['angular-loading-bar', 'ngRoute']);

angular.module('angularLab2Application').config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

angular.module('angularLab2Application').factory('CommonService', ['$http', function ($http) {
    var PrivateMethods = {
        doGet: function (url, callBackFunction) {
            $http.get(url).then(function (response) {
                if (200 === response.data.cod) {
                    $('#alert-status').text(response.data.status);
                    callBackFunction(response);
                } else {
                    PrivateMethods.processApplicationError(response);
                }
            }, function (response) {
                PrivateMethods.processInternalError(response);
            });
        },
        doDelete: function (url, callBackFunction) {
            $http.delete(url).then(function (response) {
                if (200 === response.data.cod) {
                    $('#alert-status').text(response.data.status);
                    callBackFunction(response);
                } else {
                    PrivateMethods.processApplicationError(response);
                }
            }, function (response) {
                PrivateMethods.processInternalError(response);
            });
        },
        doPost: function (url, data, callBackFunction) {
            $http.post(url, data).then(function (response) {
                if (200 === response.data.cod) {
                    $('#alert-status').text(response.data.status);
                    callBackFunction(response);
                } else {
                    PrivateMethods.processApplicationError(response);
                }
            }, function (response) {
                PrivateMethods.processInternalError(response);
            });
        },
        processInternalError: function (response) {
            $('#alert-status').text("Error");
            $('#alert-message').text(response.statusText);
            $('#errorMessageAlert').modal('show')
        },
        processApplicationError: function (response) {
            $('#alert-status').text("Error");
            $('#alert-message').text(response.data.message);
            $('#errorMessageAlert').modal('show')
        }
    };
    return {
        doGet: function (url, callback) {
            PrivateMethods.doGet(url, callback);
        },
        doPost: function (url, data, callback) {
            PrivateMethods.doPost(url, data, callback);
        },
        doDelete: function (url, callback) {
            PrivateMethods.doDelete(url, callback);
        }
    }
}
]);

angular.module('angularLab2Application').controller('angularLab2Ctrl', ['$scope', 'CommonService', function ($scope, CommonService) {
    $scope.search = function () {
        if ($scope.searchQuery) {
            CommonService.doGet("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.searchQuery + "&appid=7716b80abc29df3925a9bd926b7f5fdc&units=metric", function (data) {
                $scope.weatherData = data.data;
            });
        }
    }
}]);

angular.module('myApplication', ['angular-loading-bar', 'ngRoute']);
angular.module('myApplication').config(function ($routeProvider) {
    $routeProvider
        .when('/userSearch', {
            templateUrl: "userSearch.html",
            controller: 'pageCtrl'
        })
        .when('/info', {
            templateUrl: "info.html",
            controller: 'infoCtrl'
        })
        .when('/logout', {
            templateUrl: "logout.html",
            controller: 'menuCtrl'
        })
        .otherwise({
            redirectTo: '/info'
        });
});

angular.module('myApplication').factory('CommonService', ['$http', function ($http) {
    var PrivateMethods = {
            doGet: function (url, callBackFunction) {
                $http.get(url).then(function (response) {

                        if ("SUCCESS" === response.data.status) {
                            callBackFunction(response);
                        } else if ("REDIRECT" === response.data.status) {
                            window.location.href = response.data.data;
                        } else {
                            PrivateMethods.processApplicationError(response);
                        }
                    }, function (response) {
                        PrivateMethods.processInternalError();
                    }
                );
            },
            doDelete: function (url, callBackFunction) {
                $http.delete(url).then(function (response) {
                    if ("SUCCESS" == response.data.status) {
                        callBackFunction(response);
                    } else {
                        PrivateMethods.processApplicationError(response);
                    }
                }, function (response) {
                    PrivateMethods.processInternalError();
                });
            }
            ,
            doPost: function (url, data, callBackFunction) {
                $http.post(url, data).then(function (response) {
                    if ("SUCCESS" == response.data.status) {

                        callBackFunction(response);
                    } else if ("REDIRECT" === response.data.status) {
                        window.location.href = response.data.data;
                    } else {
                        PrivateMethods.processApplicationError(response);
                    }
                }, function (response) {
                    PrivateMethods.processInternalError();
                });
            }
            ,
            processInternalError: function () {
                $('#error-label').text("Error");
                $('#error-text').text("Internal Server Error");
                $('#error-modal').modal('open');
            }
            ,
            processApplicationError: function (response) {
                $('#error-label').text("Error");
                $('#error-text').text(response.data.data);
                $('#error-modal').modal('open');
            }
        }
    ;
    return {
        doGet: function (url, callback) {
            PrivateMethods.doGet(url, callback);
        },
        doPost: function (url, data, callback) {
            PrivateMethods.doPost(url, data, callback);
        },
        doDelete: function (url, callback) {
            PrivateMethods.doDelete(url, callback);
        },
        initDeleteObjectProcedure: function (deleteConfig) {
            PrivateMethods.initDeleteObjectProcedure(deleteConfig);
        },
        performDeleteObjectProcedure: function (deleteConfig) {
            PrivateMethods.performDeleteObjectProcedure(deleteConfig);
        }
    }
}
])
;



angular.module('myApplication').controller('loginCtrl', ['$scope', 'CommonService', function ($scope, CommonService) {
    //Init application
    $scope.doLogin = function () {
        CommonService.doPost("/sessions", {login: $scope.login, password: $scope.password}, function (response) {
            console.log("BAD!");
        });
    };
}]);
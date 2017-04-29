angular.module('myApplication').controller('menuCtrl', ['$scope', 'CommonService', function ($scope, CommonService) {
    //Init application
    $scope.init = function () {
        CommonService.doDelete("/sessions",function (response) {
            console.log("Logged Out!");
        });
    };

}]);
angular.module('myApplication').controller('infoCtrl', ['$scope', 'CommonService', function ($scope, CommonService) {
    //Init application
    $scope.init = function () {
        CommonService.doGet("/info", function (response) {
             $scope.user = response.data.data[0];
        });
    };
}]);
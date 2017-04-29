angular.module('myApplication').controller('pageCtrl', ['$scope', 'CommonService', function ($scope, CommonService) {
    //Init application
    $scope.init = function () {
        CommonService.doGet("/getAllUsers", function (response) {
             $scope.users = response.data.data;
        });
    };

    $scope.search = function () {
        CommonService.doGet("/searchUser/"+$scope.firstNameSearchQuery, function (response) {
            $scope.users = response.data.data;
        });
    };

}]);
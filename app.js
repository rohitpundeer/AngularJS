(function () {
    'use strict';
    angular.module('TooMuchApp', [])
        .controller('TooMuchController', TooMuchController);
    TooMuchController.$inject = ["$scope"];
    function TooMuchController($scope) {
        $scope.items = "";
        $scope.message = "";
        $scope.isError = false;
        $scope.CheckIfTooMuch = function () {
            var items = $scope.items && $scope.items.length > 0 ? $scope.items.split(",") : [];
            var counter = 0;
            for (var i = 0; i < items.length; i++) {
                if (items[i].trim().length > 1) {
                    counter += 1;
                }
                if (counter > 3) {
                    break;
                }
            }
            if (counter > 3) {
                $scope.isError = false;
                $scope.message = "Too Much!";
            }
            else if (counter > 0 && counter <= 3) {
                $scope.isError = false;
                $scope.message = "Enjoy!";
            }
            else {
                $scope.isError = true;
                $scope.message = "Please enter data first!";
            }
        }
    }
})();
(function () {
    'use strict';
    angular.module('AngularJsApp', [])
        .controller('AppController', AppController)
        .controller('TooMuchController', TooMuchController)
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    AppController.$inject = ["$scope"];
    function AppController($scope) {
        $scope.title = "Module 1 - Too Much";
        $scope.selectedModule = "M1";
        $scope.isModule1Review = true;
        $scope.isModule2Review = false;
        $scope.isModule3Review = false;
        $scope.isModule4Review = false;
        $scope.isModule5Review = false;

        $scope.btnReviewModule1Clicked = function () {
            $scope.title = "Module 1 - Too Much";
            $scope.selectedModule = "M1";
            reviewModule();
        }

        $scope.btnReviewModule2Clicked = function () {
            $scope.title = "Module 2 - To Buy";
            $scope.selectedModule = "M2";
            reviewModule();
        }

        $scope.btnReviewModule3Clicked = function () {
            $scope.title = "Module 3 - Restaurant Menu";
            $scope.selectedModule = "M3";
            reviewModule();
        }

        $scope.btnReviewModule4Clicked = function () {
            $scope.title = "Module 4 - Not Reacy Yet";
            $scope.selectedModule = "M4";
            reviewModule();
        }

        $scope.btnReviewModule5Clicked = function () {
            $scope.title = "Module 5 - Not Reacy Yet";
            $scope.selectedModule = "M5";
            reviewModule();
        }

        function reviewModule() {
            $scope.isModule1Review = ($scope.selectedModule === 'M1');
            $scope.isModule2Review = ($scope.selectedModule === 'M2');
            $scope.isModule3Review = ($scope.selectedModule === 'M3');
            $scope.isModule4Review = ($scope.selectedModule === 'M4');
            $scope.isModule5Review = ($scope.selectedModule === 'M5');
        }
    }

    TooMuchController.$inject = ["$scope"];
    function TooMuchController($scope) {
        $scope.items = "";
        $scope.message = "";
        $scope.isError = false;
        $scope.CheckIfTooMuch = function () {
            var items = $scope.items && $scope.items.length > 0 ? $scope.items.split(",") : [];
            var counter = 0;
            for (var i = 0; i < items.length; i++) {
                if (items[i].trim().length > 0) {
                    counter++;
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

    ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"];
    function ToBuyController($scope, ShoppingListCheckOffService) {
        $scope.toBuyList = ShoppingListCheckOffService.getToBuyList();
        $scope.buyClicked = function (index) {
            ShoppingListCheckOffService.buyClicked(index);
        }
    }
    AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"]
    function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
        $scope.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
    }
    function ShoppingListCheckOffService() {
        var toBuyList = [{ name: "Cookies", quantity: 10 },
        { name: "Soda", quantity: 5 },
        { name: "Juice", quantity: 7 },
        { name: "Apples", quantity: 20 },
        { name: "Coffee", quantity: 15 }
        ];
        var alreadyBoughtList = [];

        this.getToBuyList = function () {
            return toBuyList;
        }

        this.getAlreadyBoughtList = function () {
            return alreadyBoughtList;
        }

        this.buyClicked = function (index) {
            alreadyBoughtList.push(toBuyList[index]);
            toBuyList.splice(index, 1);
        }

    }
})();
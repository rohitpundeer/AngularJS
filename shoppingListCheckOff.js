(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

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

        this.getAlreadyBoughtList = function() {
            return alreadyBoughtList;
        }

        this.buyClicked = function (index) {
            alreadyBoughtList.push(toBuyList[index]);
            toBuyList.splice(index, 1);
        }

    }
})();
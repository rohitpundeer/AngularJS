(function () {
    'use strict';
    angular.module('Newsletter').component('newsletterhome', {
        templateUrl: "module5/newsletter-home.html",
        controller: NewsletterController
    });

    NewsletterController.$inject = ["$scope", "$state"];
    function NewsletterController($scope, $state) {

        $scope.btnSignUpClicked = function () {
            $state.go("module5.signup");
        }

        $scope.btnMyInfoClicked = function () {
            $state.go("module5.myinfo");
        }
    }
})();
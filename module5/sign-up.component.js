(function () {
    'use strict';
    angular.module('Newsletter').component('signup', {
        templateUrl: "module5/sign-up.html",
        controller: SignUpController
    });

    SignUpController.$inject = ["$state", "NewsletterService", "$timeout"];
    function SignUpController($state, NewsletterService, $timeout) {
        var scope = this;
        scope.successMsg = "";
        scope.user = {
            firstanme: "",
            lastname: "",
            favouriteItem: {
                name: "",
                description: "",
                price_large: "",
                short_name: ""
            },
            email: "",
            phone: ""
        }
        scope.isInvalidMenuCode = false;
        scope.validateMenuCode = function () {
            scope.successMsg = "";
            var code = scope.user.favourite || "";
            if (code.length == 2) {
                var secondPlace = isNaN(parseInt(code.charAt(1))) ? code.charAt(1) : (parseInt(code.charAt(1)) - 1);
                NewsletterService.validateMenuCode(code.charAt(0), secondPlace).then(function (response) {
                    if (response.data) {
                        scope.user.favouriteItem = response.data;
                        scope.isInvalidMenuCode = false;
                    }
                    else {
                        scope.isInvalidMenuCode = true;
                    }
                }).catch(function (error) {
                    scope.isInvalidMenuCode = true;
                });
            }
        }

        this.signup = function () {
            NewsletterService.completeSignup(scope.user);
            scope.successMsg = "Your information has been saved."
            $timeout(function () {
                $state.go('module5.myinfo');
            }, 3000);
        }
    }

})();
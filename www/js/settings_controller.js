angular.module("tcApp").controller(
    "SettingsController", ["$scope", "$rootScope", "$location",
        function($scope, $rootScope, $location) {

            var emailAddress = localStorage.getItem('emailAddress');
            $('#emailAddress').val(emailAddress);

            var empName = localStorage.getItem('empName');
            $('#empName').val(empName);

            var empNumber = localStorage.getItem('empNumber');
            $('#empNumber').val(empNumber);

            $rootScope.saveSettings = function() {
                try {
                    var emailAddress = $('#emailAddress').val();
                    localStorage.setItem('emailAddress', emailAddress);

                    var empName = $('#empName').val();
                    localStorage.setItem('empName', empName);

                    var empNumber = $('#empNumber').val();
                    localStorage.setItem('empNumber', empNumber);

                    window.history.back();
                } catch (ex) {
                    alert('Data invalid');
                }
            };


        }]);


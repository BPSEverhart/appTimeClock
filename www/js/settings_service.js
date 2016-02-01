angular.module("tcApp")
    .constant("localStorage", window.localStorage);

angular.module("tcApp").service("Settings", ["localStorage",
    function(localStorage) {

        this.empName = function (value) {
            if (value === null || value != undefined) {
                localStorage.setItem("_empName", value);
            }
            return localStorage.getItem("_empName");
        };

        this.empNumber = function (value) {
            if (value === null || value != undefined) {
                localStorage.setItem("_empNumber", value);
            }
            return localStorage.getItem("_empNumber");
        };

        this.emailAddress = function (value) {
            if (value === null || value != undefined) {
                localStorage.setItem("_emailAddress", value);
            }
            return localStorage.getItem("_emailAddress");
        };

        this.saveSettings = function(empName, empNum, email, callback) {
            var self = this;
            self.empName(empName);
            self.empNumber(empNum);
            self.emailAddress(email);
            if(typeof(callback) == "function") {
                callback();
            }
        };

        this.saveDriveIn = function() {

        };

        this.saveServiceIn = function() {

        };

        this.saveServiceOut = function() {

        };


    }]);


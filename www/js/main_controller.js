angular.module("tcApp").controller("MainController",
    function($scope, $rootScope, $location) {

        $scope.timediff = function(start, end) {
            var dateObj = moment(moment(end).diff(moment(start))).toObject();
            return dateObj.hours.toString() + ":" + dateObj.minutes.toString() + ":" + dateObj.seconds.toString();
        };

        $scope.emailAddress = function (value) {
            if (value === null || value != undefined) {
                localStorage.setItem("_email_address", value);
            }
            return localStorage.getItem("_email_address");
        };
        $scope.empName = localStorage.getItem("_empName");

        $scope.empNumber = localStorage.getItem("_empNumber");

        $scope.saveSettings = function() {
            localStorage.setItem('_empName', $scope.empName);

            localStorage.setItem('_empNumber', $scope.empNumber);
        };

        // variables to control display of data.
        $scope.driveInClocked = false;
        $scope.serviceInClocked = false;
        $scope.serviceOutClocked = false;
        $scope.lunchLogged = false;

        // variables to control the display of buttons
        $scope.StartOn = true;
        $scope.ServIn = false;
        $scope.ServOut = false;

        // variables for controlling the lunch times and buttons
        $scope.lunchStartTime = null;
        $scope.lunchEndTime = null;
        $scope.lunchStarted = false;
        $scope.lunchLogged = false;

        // variables for maintaining the display of dates and times
        $scope.mydate = new Date();
        $scope.driveInTime = null;
        $scope.serviceInTime = null;
        $scope.serviceOutTime = null;
        $scope.serviceLoc = "";

        $scope.lunchClock = function(action) {
            if (action == 'in') {
                $scope.lunchStartTime = new Date();
                $scope.lunchStarted = true;
            }
            else {
                $scope.lunchEndTime = new Date();
                $scope.lunchLogged = true;
            }
        };

        // Start New Job - this clocks in the drive time and displays the travel clock in
        $scope.driveInClock = function () {
            // create a new job to be logged.
            $scope.driveInTime = new Date();
            $scope.driveInClocked = true;
            $scope.StartOn = false;
            $scope.ServIn = true;
        };

        // Clock in for actual Service call, displays the travel clock out and the service start
        $scope.serviceInClock = function () {
            $scope.serviceInTime = new Date();
            // call to get the location
            GetGeolocation();
            $scope.serviceInClocked = true;
            $scope.ServIn = false;
            $scope.ServOut = true;
        };

        // Clock out for Service call, displays the service complete time, ends the job
        $scope.serviceOutClock = function () {
            $scope.serviceOutTime = new Date();
            $scope.serviceOutClocked = true;
            $scope.ServOut = false;

        };

        $scope.goToTime = function () {
            $location.path("/time/");
        };

        $scope.goToSettings = function () {
            $location.path("/settings/");
        };

        $scope.pageCssClass = function() {
            var body_class = "";
            body_class += $location.path().replace(/\//g, ' ');
            return body_class;
        };

        $scope.init = function() {

        };

        $scope.init();

    });

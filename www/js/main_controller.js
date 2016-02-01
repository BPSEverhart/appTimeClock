angular.module("tcApp").controller("MainController",
    function($scope, $rootScope, $location, Settings) {


        // variables to control display of data.
        $scope.mainPage = true;
        $scope.settingsShow = false;
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
        $scope.message = "";
        $scope.driveInTime = null;
        $scope.serviceInTime = null;
        $scope.serviceOutTime = null;
        $scope.serviceLoc = "";

        $scope.timediff = function(start, end) {
            var dateObj = moment(moment(end).diff(moment(start))).toObject();
            return dateObj.hours.toString() + ":" + dateObj.minutes.toString() + ":" + dateObj.seconds.toString();
        };

        $scope.showSettings = function () {
            $scope.settingsShow = true;
            $scope.mainPage = false;
        };

        $scope.saveMySettings = function (emp, num, email) {

            Settings.saveSettings(emp, num, email, function() {
                    $scope.empName = Settings.empName();
                    $scope.empNumber = Settings.empNumber();
                    $scope.emailAddress = Settings.emailAddress();
                    $scope.settingsShow = false;
                    $scope.mainPage = true;
                }
            );
        };

        $scope.cancel = function() {
            $scope.settingsShow = false;
            $scope.mainPage = true;
        };

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
            $scope.serviceInClocked = false;
            $scope.serviceOutClocked = false;
            $scope.StartOn = false;
            $scope.ServIn = true;
            $scope.message = "New Job \n\tTravel Clock In: " + $scope.driveInClocked;
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
            $scope.StartOn = true;
        };

        $scope.init = function() {
            $scope.empName = Settings.empName();
            $scope.empNumber = Settings.empNumber();
            $scope.emailAddress = Settings.emailAddress();
        };

        $scope.init();

    });

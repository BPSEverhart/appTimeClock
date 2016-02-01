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
            $scope.message = "Name: " + $scope.empName + "\nNumber/Id: " + $scope.empNumber;
        };

        $scope.cancel = function() {
            $scope.settingsShow = false;
            $scope.mainPage = true;
        };

        $scope.lunchClock = function(action) {
            if (action == 'in') {
                $scope.lunchStartTime = new Date();
                $scope.lunchStarted = true;
                $scope.message += "\n\nLunch: \n\t" + $scope.lunchStartTime;
            }
            else {
                $scope.lunchEndTime = new Date();
                $scope.lunchLogged = true;
                $scope.message += "\n\t" + $scope.lunchEndTime;
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
            $scope.message += "\n\nNew Job \n\tTravel Clock In: " + $scope.driveInTime;
        };

        // Clock in for actual Service call, displays the travel clock out and the service start
        $scope.serviceInClock = function () {
            $scope.serviceInTime = new Date();
            // call to get the location
            GetGeolocation();
            $scope.serviceInClocked = true;
            $scope.ServIn = false;
            $scope.ServOut = true;
            $scope.message += "\n\tTravel Clock Out: " + $scope.serviceInTime +
                              "\n\n\tService Clock In: " + $scope.serviceInTime;
        };

        // Clock out for Service call, displays the service complete time, ends the job
        $scope.serviceOutClock = function () {
            $scope.serviceOutTime = new Date();
            $scope.serviceOutClocked = true;
            $scope.serviceLoc = document.getElementById('address').value;
            $scope.ServOut = false;
            $scope.StartOn = true;
            $scope.message += "\n\tService Location: " + $scope.serviceLoc +
                              "\n\tService Clock Out: " + $scope.serviceOutTime;
            console.log($scope.message);
        };

        $scope.closeOut = function () {

        };

        $scope.init = function() {
            $scope.empName = Settings.empName();
            $scope.empNumber = Settings.empNumber();
            $scope.emailAddress = Settings.emailAddress();
            $scope.message = "Name: " + $scope.empName + "\nNumber/Id: " + $scope.empNumber;
        };

        $scope.init();

    });

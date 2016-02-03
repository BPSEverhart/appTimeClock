angular.module("tcApp").controller("MainController",
    function($scope, $rootScope, $location, Settings) {

        // variables to control display of data.
        $scope.mainPage = true;
        $scope.settingsShow = false;
        $scope.driveInClocked = false;
        $scope.serviceInClocked = false;
        $scope.serviceOutClocked = false;

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


        // functions
        $scope.timediff = function(start, end) {
            var dateObj = moment(moment(end).diff(moment(start))).toObject();
            return dateObj.hours.toString() + ":" + dateObj.minutes.toString() + ":" + dateObj.seconds.toString();
        };

        // user clicks on Employee information button
        $scope.showSettings = function () {
            $scope.settingsShow = true;
            $scope.mainPage = false;
        };

        // user updates Employee information
        $scope.saveMySettings = function (emp, num, email) {

            Settings.saveSettings(emp, num, email, function() {
                    $scope.empName = Settings.empName();
                    $scope.empNumber = Settings.empNumber();
                    $scope.emailAddress = Settings.emailAddress();
                    $scope.settingsShow = false;
                    $scope.mainPage = true;
                }
            );
            $scope.message = "Name: \t\t\t" + $scope.empName + "\nNumber/Id: \t\t" + $scope.empNumber;
            Settings.messageSaved($scope.message);
        };

        // user cancels out of Employee information
        $scope.cancel = function() {
            $scope.settingsShow = false;
            $scope.mainPage = true;
        };

        // handles lunch times - these are only cleared when the user closes out the day
        $scope.lunchClock = function(action) {
            if (action == 'in') {
                $scope.lunchStartTime = new Date();
                Settings.lunchStartTime($scope.lunchStartTime);
                $scope.lunchStarted = Settings.lunchStarted(true);
                $scope.message += "\n\nLunch: \n\t" + $scope.lunchStartTime;
            }
            else {
                $scope.lunchEndTime = new Date();
                Settings.lunchEndTime($scope.lunchEndTime);
                $scope.lunchLogged = Settings.lunchLogged(true);
                $scope.message += "\n\t" + $scope.lunchEndTime;
            }
            Settings.messageSaved($scope.message);
        };

        // Start New Job - this clocks in the drive time and displays the travel clock in
        $scope.driveInClock = function () {
            // create a new job to be logged.
            $scope.driveInTime = new Date();
            Settings.driveInTime($scope.driveInTime);
            $scope.driveInClocked = Settings.driveInClocked(true);
            Settings.serviceInClocked(false);
            $scope.serviceInClocked = false;
            Settings.serviceOutClocked(false);
            $scope.serviceOutClocked = false;
            $scope.StartOn = false;
            $scope.ServIn = true;
            $scope.message += "\n\nNew Job \n\tTravel Clock In: \t\t" + $scope.driveInTime;
            Settings.messageSaved($scope.message);
        };

        // Clock in for actual Service call, displays the travel clock out and the service start
        $scope.serviceInClock = function () {
            $scope.serviceInTime = new Date();
            Settings.serviceInTime($scope.serviceInTime);
            // call to get the location
            GetGeolocation();
            $scope.serviceInClocked = Settings.serviceInClocked(true);
            $scope.ServIn = false;
            $scope.ServOut = true;
            $scope.message += "\n\tTravel Clock Out: \t" + $scope.serviceInTime +
                              "\n\n\tService Clock In: \t\t" + $scope.serviceInTime;
            Settings.messageSaved($scope.message);
        };

        // Clock out for Service call, displays the service complete time, ends the job
        $scope.serviceOutClock = function () {
            $scope.serviceOutTime = new Date();
            Settings.serviceOutTime($scope.serviceOutTime);
            $scope.serviceOutClocked = Settings.serviceOutClocked(true);
            $scope.serviceLoc = document.getElementById('address').value;
            Settings.serviceLoc($scope.serviceLoc);
            $scope.ServOut = false;
            $scope.StartOn = true;
            $scope.message += "\n\tService Clock Out: \t" + $scope.serviceOutTime +
                              "\n\tService Location: \t\t" + $scope.serviceLoc;
            Settings.messageSaved($scope.message);
        };

        $scope.closeOut = function () {
            $scope.sendTo = ["april@westerntel-com.com", $scope.emailAddress];
            $scope.closeOutTime = new Date();
            if (document.getElementById('perDiem').checked) {
                $scope.message += "\n\nPer Diem Requested";
            }
            $scope.message += "\n\nFinal Clock Out: \t\t" + $scope.closeOutTime;
            // send email
            console.log($scope.message);

            cordova.plugins.email.open({
                to:         $scope.sendTo,         // email addresses for TO field
                subject:    "My Time Sheet",       // subject of the email
                body:       $scope.message,        // email body (for HTML, set isHtml to true)
                isHtml:     false                  // indicates if the body is HTML or plain text
            }, function() {}, this);

            // clear all saved data
            $scope.mainPage = true;

            $scope.driveInClocked = false;
            Settings.driveInClocked(false);

            $scope.serviceInClocked = false;
            Settings.serviceInClocked(false);

            $scope.serviceOutClocked = false;
            Settings.serviceOutClocked(false);

            $scope.lunchStarted = false;
            Settings.lunchStarted(false);

            $scope.lunchLogged = false;
            Settings.lunchLogged(false);

            $scope.message = "Name: " + $scope.empName + "\nNumber/Id: " + $scope.empNumber;
            Settings.messageSaved($scope.message);

            $scope.StartOn = true;
            $scope.ServIn = false;
            $scope.ServOut = false;
        };

        $scope.init = function() {
            $scope.mydate = new Date();
            $scope.empName = Settings.empName();
            $scope.empNumber = Settings.empNumber();
            $scope.emailAddress = Settings.emailAddress();

            if (Settings.messageSaved() == null) {
                $scope.message = "Name: " + $scope.empName + "\nNumber/Id: " + $scope.empNumber;
                Settings.messageSaved($scope.message);
            }
            else {
                $scope.message = Settings.messageSaved();
            }

            $scope.driveInTime = new Date(Settings.driveInTime());
            $scope.serviceInTime = new Date(Settings.serviceInTime());
            $scope.serviceOutTime = new Date(Settings.serviceOutTime());
            $scope.lunchStartTime = new Date(Settings.lunchStartTime());
            $scope.lunchEndTime = new Date(Settings.lunchEndTime());

            if (Settings.lunchStarted() === "true") {
                $scope.lunchStarted = true;
            }
            if (Settings.lunchLogged() === "true") {
                $scope.lunchLogged = true;
            }

            if (Settings.driveInClocked() === "true") {
                $scope.driveInClocked = true;
                $scope.serviceInClocked = false;
                $scope.serviceOutClocked = false;
                $scope.StartOn = false;
                $scope.ServIn = true;
            }

            if (Settings.serviceInClocked() === "true") {
                $scope.serviceInClocked = true;
                $scope.ServIn = false;
                $scope.ServOut = true;
                GetGeolocation();
            }

            if (Settings.serviceOutClocked() === "true") {
                $scope.serviceOutClocked = true;
                $scope.serviceLoc = Settings.serviceLoc();
                var address = document.getElementById('address');
                address.value = $scope.serviceLoc;
                $scope.ServOut = false;
                $scope.StartOn = true;
            }
        };

        $scope.init();

    });

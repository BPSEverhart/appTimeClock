tcApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/time', {
                templateUrl: 'views/time.html',
                controller: 'TimeController'
            }).
            when('/time/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsController'
            }).
            otherwise({
                redirectTo: 'time'
            });
    }
]);

(function($) {
    "use strict";

    var saveSettings = function() {
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

$( document ).on( "ready", function(){
    //$('#submitTime').on('click', submitTime);
    //$('#saveSettings').on('click', saveSettings);

    var emailAddress = localStorage.getItem('emailAddress');
    $('#emailAddress').val(emailAddress);

    var empName = localStorage.getItem('empName');
    $('#empName').val(empName);

    var empNumber = localStorage.getItem('empNumber');
    $('#empNumber').val(empNumber);
});

$( document ).on( "deviceready", function(){
    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByName("gray");
});

}
)(jQuery);


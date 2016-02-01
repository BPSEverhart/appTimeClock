function GetGeolocation()
{
    var options = { timeout: 30000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(GetPosition, PositionError, options);
}

function GetPosition(position)
{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    ReverseGeocode(latitude,longitude);   // Pass the latitude and longitude to get address.
}

function PositionError() {
    navigator.notification.alert('Could not find the current location.');
}

function ReverseGeocode(latitude, longitude) {
    var myAddress = "";
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                myAddress = results[0].formatted_address;
            }
            else {
                myAddress = "Lat:" + latitude.toString() + " Lon:" + longitude.toString();
                //navigator.notification.alert('Unable to detect your address.');
            }
        } else {
            myAddress = "Lat:" + latitude.toString() + " Lon:" + longitude.toString();
            //navigator.notification.alert('Unable to detect your address.');
        }
        var address = document.getElementById('address');
        address.value = myAddress;
    });
}

function FormatDate() {
    var d = new Date();

    var dateStr = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    return dateStr;
}
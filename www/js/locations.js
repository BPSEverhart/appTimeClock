function GetGeolocation()
{
    console.log ("in GetGeolocation");
    var options = { timeout: 30000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(GetPosition, PositionError, options);
}

function GetPosition(position)
{
    console.log ("in GetPosition");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log (latitude, longitude)
    ReverseGeocode(latitude,longitude);   // Pass the latitude and longitude to get address.
}

function PositionError() {
    navigator.notification.alert('Could not find the current location.');
}

function ReverseGeocode(latitude, longitude){
    console.log ("in ReverseGeocode");

    var myAddress = "";
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                console.log(results[0].formatted_address);
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

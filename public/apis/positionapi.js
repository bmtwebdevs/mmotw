var apis = apis || {};
apis.position = apis.position || (function () {

    function getCurrentPosition(callback) {
        if ("geolocation" in navigator) {
          /* geolocation is available */
          navigator.geolocation.getCurrentPosition(function(position) {
              callback(position)
          });
        } else {
          console.log('GeoLocation not available');
        }
    }

    function getCurrentLocation(callback) {

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {

            // TODO: find a town from a lat/lon
            var geocoder;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            return geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var add = results[0].formatted_address;
                            var value=add.split(",");

                            count=value.length;

                            callback({
                                address: results[0].formatted_address,
                                country: value[count-1],
                                state: value[count-2],
                                city: value[count-3]
                            });

                        }
                        else  {
                            callback({
                                city: "address not found"
                            });
                        }
                    }
                    else {
                        callback({ error: "Geocoder failed due to: " + status });
                    }
                });
            });
        }
        else{
            x.innerHTML="Geolocation is not supported by this browser.";
        }


    }

    return {
        getCurrentPosition: getCurrentPosition,
        getCurrentLocation: getCurrentLocation
    };
})();
var apis = apis || {};
apis.position = apis.position || (function () {

    function getCurrentPosition(callback) {
        if ("geolocation" in navigator) {
          /* geolocation is available */
          navigator.geolocation.getCurrentPosition(function(position) { callback(position) });
        } else {
          console.log('GeoLocation not available');
        }
    }

    function getCurrentLocation() {
        // TODO: find a town from a lat/lon
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
})();
var apis = apis || {};
apis.travel = apis.travel || (function () {

    const app_key = 'AIzaSyChN_PRbrsdCc9cUibyciOmylX-nZY1S2w';
    const base = 'https://maps.googleapis.com/maps/api/directions/json';
    const creds = 'key=' + app_key;

    function getDirections(origin, destination, travel_mode) {
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: origin,
            destination: destination,
            travelMode: travel_mode
        }
        return new Promise(function (resolve, reject)
        {
            return directionsService.route(request, function (response, status)
            {
                resolve(response);
            });
        });
    }

    return {
        getDirections: getDirections
    };
})();
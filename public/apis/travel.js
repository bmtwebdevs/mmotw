var apis = apis || {};
apis.travel = apis.travel || (function () {

    const app_key = 'AIzaSyChN_PRbrsdCc9cUibyciOmylX-nZY1S2w';
    const base = 'https://maps.googleapis.com/maps/api/directions/json';
    const creds = 'key=' + app_key;

    function getDirections(origin, destination) {
        //return  gapi.client.request({
        //    'path': base,
        //    'params': { 'origin': origin, 'destination' : destination }
        //}).then(function (response) {
        //    return JSON.parse(response);
        //});
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        }
        //return apis.ajax.get(base + '?origin=' + origin + '&destination=' + destination +  '&' + creds
        //).then(function (response) {
        //    return JSON.parse(response);
        //});
        return directionsService.route(request, function (response, status) {
                console.log(response);
                return response;
        });
    }

    return {
        getDirections: getDirections
    };
})();
document.addEventListener("DOMContentLoaded", function (event) {
    
    apis.transport.findStations('bath spa')
        .then(function (response) {

            var station = response[0];
            console.log(station);

            apis.transport.live(station.station_code)
                .then(function (response) {
                    console.log(response);
                });
        });
});
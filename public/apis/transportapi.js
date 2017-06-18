var apis = apis || {};
apis.transport = apis.transort || (function () {

    const refreshInterval = config.app['transport-request-frequency-seconds'];
    const startupTime = new Date().getTime();
    const app_id = 'd2304e4b';// '3f192405'; //cc93ef95
    const app_key = 'f426daed2f549e375be3556e06ac5c7e';// '407845dbf9ce56f10a746173ccae2594'; //0a733fb0fb7a366d141bc97c66c5168f
    const base = 'http://transportapi.com/v3/uk/';
    const creds = 'app_id=' + app_id + '&app_key=' + app_key;

    const stationsUrl = 'places.json?type=train_station';
    const liveUrl = 'train/station/{STATION_CODE}/live.json';

    function findStations(search) {

        return apis.ajax.get(base + stationsUrl + '&' + creds, {
            query: search
        }).then(function (response) {
            return JSON.parse(response).member;
        });
    }

    function live(station) {

        return apis.ajax.get(base + liveUrl.replace('{STATION_CODE}', station) + '?' + creds)
            .then(function (response) {
                var data = JSON.parse(response);
                return _.map(data.departures.all, function (departure) {
                    return {
                        due: departure.aimed_departure_time,
                        from: departure.origin_name,
                        to: departure.destination_name,
                        status: departure.status,
                        expected: departure.expected_departure_time
                    };
                });
            });
    }

    return {
        findStations: findStations,
        live: live
    };
})();
var apis = apis || {};
apis.weather = apis.weather || (function () {

    const app_id = '932f2c5b3b0f2a7a80248e42effbef0a';
    const base = 'http://api.openweathermap.org/data/2.5/weather';
    const creds = 'APPID=' + app_id;

    function getWeather(search) {

        return apis.ajax.get(base + '?id=2654675' + '&' + creds
        ).then(function (response) {
            return JSON.parse(response);
        });
    }

    return {
        getWeather: getWeather
    };
})();
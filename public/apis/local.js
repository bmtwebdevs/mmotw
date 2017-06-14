var apis = apis || {};
apis.local = apis.local || (function () {

    function getWeather(location) {
        return apis.ajax.get('http://localhost:3000/forecast/?', { lat: location.coords.latitude, lon: location.coords.longitude })
        .then((response) => {
            return response;
        });
    }

    return {
        getWeather: getWeather
    };
})();
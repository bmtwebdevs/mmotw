var weather = weather || (function () {

    function currentWeatherPanel(selector) {
        apis.weather.getWeather()
            .then(function (response) {
                console.log(response);

                //Convert EPOCH date to human readable
                var timestamp = response.dt;
                var dateTime = new Date(timestamp * 1000);
                var year = dateTime.getFullYear();
                var month = dateTime.getMonth() + 1;
                var day = dateTime.getDate();
                var dateTime1 = day + '-' + month + '-' + year;

                var weatherPanel = _(document.querySelectorAll(selector));

                weatherPanel.forEach(function (div) {

                    var html = '<dtitle>Weather - Bristol</dtitle>';

                    var tempConvert = parseInt(response.main.temp) - 273.15;
                    var temp = Math.round(tempConvert * 100) / 100;

                    var iconCode = response.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                    html += '<font size=5>';

                    html += '<div>' + dateTime1 + '</div><br>';

                    html += '<div>' + response.weather[0].main + '</div>';

                    html += '<div><img src="' + iconUrl + '"/></div>';

                    html += '<div>' + temp + '&deg;</div><br>';

                    div.innerHTML = html;
                });
            });
    }

    return {
        currentWeatherPanel: currentWeatherPanel
    };
})();
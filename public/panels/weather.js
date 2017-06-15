var weather = weather || (function () {

    var panel;

    function update() {
        apis.position.getCurrentPosition(drawWeather);
    }

    function drawWeather(position) {
        apis.weather.getWeather(position.coords)
            .then(function (response) {
                //Convert EPOCH date to human readable
                var timestamp = response.dt;
                var dateTime = new Date(timestamp * 1000);
                var year = dateTime.getFullYear();
                var month = dateTime.getMonth() + 1;
                var day = dateTime.getDate();
                var dateTime1 = day + '-' + month + '-' + year;

                var html = '<p class="title">' + response.name + '</p>';

                var tempConvert = parseInt(response.main.temp) - 273.15;
                var temp = Math.round(tempConvert * 10) / 10;

                var iconCode = response.weather[0].icon;

                var prefix = 'wi wi-';
                var code = response.weather[0].id;
                var icon = weatherIcons[code].icon;

                // If we are not in the ranges mentioned above, add a day/night prefix.
                if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                    icon = 'day-' + icon;
                }

                // Finally tack on the prefix.
                icon = prefix + icon;

                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                var icon = '<i class="' + icon + '" ></i>';

                html += '<p class="details">' + response.weather[0].main + '</p>';

                html += '<p class="temp">' + temp + '&deg;' + icon + '</p>';

                panel.innerHTML = html;
            }).then(function () {
                setTimeout(update, 30000);
            });

    }


    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };
})();
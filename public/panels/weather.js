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
                var temp = getTempInDegrees(response.main.temp);

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
                var iconHtml = '<div class="iconContainer"><i class="' + icon + '" ></i></div>';

                var html = iconHtml;
                html += '<div class="textContainer"><p class="title">' + response.name + '</p>';

                html += '<p class="details">' + response.weather[0].main + '</p></div>';

                html += '<div class="iconContainer"><p class="temp">' + temp + '&deg;' + '</p></div>';

                panel.innerHTML = html;
            }).then(function () {
                setTimeout(update, 30000);
            });

    }

    function getTempInDegrees(temp) {
        var tempConvert = parseInt(temp) - 273.15;
        return Math.round(tempConvert * 10) / 10;
    }

    function sayWeather() {

        apis.position.getCurrentPosition(function(position) {

            apis.weather.getWeather(position.coords)
            .then(function (response) {

                speechClient.say('The weather today in ' + response.name + ' is ' + getTempInDegrees(response.main.temp) + '\
                degrees and ' + response.weather[0].main);

            });
        });

    }


    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach,
        sayWeather: sayWeather
    };
})();
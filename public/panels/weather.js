var weather = weather || (function () {

    var panel;

    function update() {
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

                var html = '<h4>Weather - Bath</h4>';

                var tempConvert = parseInt(response.main.temp) - 273.15;
                var temp = Math.round(tempConvert * 10) / 10;

                var iconCode = response.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                html += '<h5>' + dateTime1 + '</h5><br>';

                html += '<h3>' + response.weather[0].main + '</h3>';

                html += '<div><img src="' + iconUrl + '" width=150 height=150/></div>';

                html += '<h2>' + temp + '&deg;</h2><br>';

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
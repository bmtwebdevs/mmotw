var forecast = forecast || (function () {

    var panel;

    function update() {
        apis.position.getCurrentPosition(drawForecast);
    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    function drawForecast(position) {
        apis.forecast.getForecast(position.coords)
            .then(function (response) {

                var html = '<div class="flexslider">';

                html += '<ul class="slides">';

                var forecastData = response.list.map(function(item) {

                    var timestamp = new Date (item.dt_txt);

                    var weekday = new Array(7);
                    weekday[0] =  "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var dayname = weekday[timestamp.getDay()];

                    var forecastDate = new Date(item.dt_txt);
                    var h = forecastDate.getHours();
                    var m = forecastDate.getMinutes();
                    h = checkTime(h);
                    m = checkTime(m);

                    var tempConvert = parseInt(item.main.temp) - 273.15;
                    var temp = Math.round(tempConvert * 10) / 10;

                    var iconCode = response.list[0].weather[0].icon;

                    var prefix = 'wi wi-';
                    var code = response.list[0].weather[0].id;
                    var icon = weatherIcons[code].icon;

                    //If we are not in the ranges mentioned above, add a day/night prefix.
                    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                        icon = 'day-' + icon;
                    }

                    //Finally tack on the prefix.
                    icon = prefix + icon;

                    var iconHtml = '<i class="' + icon + '" ></i>';


                    return {
                        timestamp: timestamp,
                        dayname: dayname,
                        hours: h,
                        mins: m,
                        temp: temp,
                        icon: iconHtml
                    };

                });

                var groupedForecastData = _.groupBy(forecastData, x => x.dayname);

                var orderedGroupedForecastData = _.orderBy(groupedForecastData,x => x.timestamp);


                orderedGroupedForecastData.forEach(function(day) {

                   html += '<li>';

                   html += '<ul>';

                   html += '<li>';

                   html += '<p class="title">' + day[0].dayname + '</p>';

                   day.forEach(function(timeForecast, i) {

                     if(i % 2 === 0) {
                      html += '<p class="tempforecast">' + timeForecast.hours + ':' + timeForecast.mins + '<span class="gridTemp">' + timeForecast.temp + '&deg;</span>' + timeForecast.icon + '</p>';
                     }

                   });

                   html += '</ul>'

                   html += '</li>'

                });

                 html += '</ul>';
                 html += '</div>';

                panel.innerHTML = html;
                startSlider();
            }).then(function () {
                setTimeout(update, 30000);
            });

    }

    function attach(p) {

        panel = p;
        update();

    }

    function startSlider() {

        $('.flexslider').flexslider({
            animation: "slide",
            slideshow: true,
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });
    }

    return {
        attach: attach
    };
})();
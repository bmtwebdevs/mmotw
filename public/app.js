document.addEventListener("DOMContentLoaded", function (event) {
    
    apis.weather.getWeather()
    .then(function (response) {
        console.log(response);
        
        //Convert EPOCH date to human readable
        var timestamp = response.dt;
        var dateTime = new Date(timestamp*1000);        
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();                
        var dateTime1 = day + '-' + month + '-' + year;                
                       
        var weatherPanel = _(document.querySelectorAll(".weather-data"));

        weatherPanel.forEach(function (div) {
            
            var html = '<dtitle>Weather - Bristol</dtitle>';
            
            var tempConvert = parseInt(response.main.temp)-273.15;            
            var temp = Math.round(tempConvert * 100)/100;
            
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

    var trainPanels = _(document.querySelectorAll(".train-times"));

    trainPanels.forEach(function (div) {
        div.innerHTML = '<dtitle>Train Times<hr /></dtitle><div>Loading</div>';
    });

    apis.transport.findStations('bath spa')
        .then(function (response) {

            var station = response[0];
            console.log(station);

            apis.transport.live(station.station_code)
                .then(function (response) {

                    trainPanels.forEach(function (div) {

                        var html = ' \
                            <dtitle>Train Times</dtitle> \
                            <hr /> \
                            <ul>';

                        _(response).forEach(function (item) {

                            var itemClass = item.status === 'LATE' ? 'bad' : 'good';

                            html += '<li class="' + itemClass + '">' + item.expected;
                            if (item.expected !== item.due) {
                                html += ' (' + item.due + ')';
                            }
                            html += ' ' + item.to + ' ' + item.status + '</li>';
                        });


                        html += '</ul>';

                        div.innerHTML = html;
                    });

                });
        });
});
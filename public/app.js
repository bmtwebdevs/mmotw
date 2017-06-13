function traintimes() {
    var trainPanels = document.querySelectorAll(".train-times");

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

                        response.forEach(function (item) {

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
}

var hideTime;

function voiceReceived(event) {
    console.log('You said: ', event.results[0][0].transcript);

    hideTime = new Date();
    hideTime.setMilliseconds(hideTime.getMilliseconds() + 2990);

    var speechFeedback = document.querySelectorAll('.speech-feedback')[0];
    speechFeedback.classList.remove("hidden");

    Typed.new(".speech-feedback span", {
        strings: [event.results[0][0].transcript],
        typeSpeed: 0
    });

    setTimeout(function () {

        var now = new Date();
        if (now < hideTime) {
            return;
        }
        speechFeedback.classList.add("hidden");
    }, 3000);
}

function voice() {

    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();

    recognition.onresult = voiceReceived;

    recognition.onend = function (event) {
        recognition.start();
    };
}

function triggerVoice(message) {
    voiceReceived({ results: [[{ transcript: message }]] });
}

function weather() {
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
}

document.addEventListener("DOMContentLoaded", function (event) {

    voice();
    traintimes();
    weather();

    setTimeout(function () { triggerVoice("Hello World") }, 1000);
    //setTimeout(function () { triggerVoice("Hello Gareth") }, 3900);
});
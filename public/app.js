
document.addEventListener("DOMContentLoaded", function (event) {

    voice.listen('.speech-feedback')
    trains.liveDeparturePanel('.train-times');
    weather.currentWeatherPanel('.weather-data');

    voice.triggerVoice('Speak to Me');
       
});



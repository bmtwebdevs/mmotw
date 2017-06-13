
document.addEventListener("DOMContentLoaded", function (event) {

    voice.listen('.speech-feedback')
    trains.liveDeparturePanel('.train-times');
    weather.currentWeatherPanel('.weather-data');

    setTimeout(function () { voice.triggerVoice('Hello World') }, 1000);
    //setTimeout(function () { voice.triggerVoice("Hello Gareth") }, 3900);
});

document.addEventListener("DOMContentLoaded", function (event) {

    layout.initialise(".container-fluid");
    layout.addPanel(userprofile);
    layout.addPanel(blank);
    layout.addPanel(time, { height: '200px', 'min-height': '200px' });


    layout.addPanel(weather, { height: '200px', 'min-height': '200px' });
    layout.addPanel(blank);
    layout.addPanel(travel);

    layout.addPanel(trains);
    layout.addPanel(slider);
    layout.addPanel(dsWeather);

    layout.addPanel(calendarPanel, { size: 8 });
    layout.addPanel(tasks);

    voice.listen('.speech-feedback');
    voice.triggerVoice('Speak to me..');

    faceClient.initialise();
});

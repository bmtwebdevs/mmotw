
document.addEventListener("DOMContentLoaded", function (event) {

    layout.initialise(".container-fluid");
    layout.addRow();
    layout.addPanel(userprofile);
    layout.addPanel(blank);
    layout.addPanel(time, { height: '200px' });

    layout.addRow();
    layout.addPanel(weather, { height: '200px' });
    layout.addPanel(blank);
    layout.addPanel(travel);

    layout.addRow();
    layout.addPanel(trains);
    layout.addPanel(slider);
    layout.addPanel(dsWeather);

    layout.addRow();
    layout.addPanel(calendarPanel, { size: 8 });
    layout.addPanel(tasks);

    voice.listen('.speech-feedback');
    voice.triggerVoice('Speak to me..');

    faceClient.initialise();
});

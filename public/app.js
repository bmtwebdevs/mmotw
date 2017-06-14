
document.addEventListener("DOMContentLoaded", function (event) {

    layout.initialise(".container-fluid");
    layout.addPanel(trains);
    layout.addPanel(weather);
    layout.addPanel(time);
    layout.addPanel(userprofile);
    layout.addPanel(slider);
    layout.addPanel(travel);
    layout.addPanelSpecial(calendarPanel,8);
    layout.addPanel(tasks);

    voice.listen('.speech-feedback');
    voice.triggerVoice('Speak to me..');

    faceClient.initialise();
});

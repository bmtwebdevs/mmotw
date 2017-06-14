
document.addEventListener("DOMContentLoaded", function (event) {

    layout.initialise(".container-fluid");
    layout.addPanel(userprofile);
    layout.addPanel(blank);    
    layout.addPanel(time);
    

    layout.addPanel(weather);
    layout.addPanel(blank);
    layout.addPanel(travel);    
                    
    layout.addPanel(trains);
    layout.addPanel(slider);    
    layout.addPanel(dsWeather);

    layout.addPanelSpecial(calendarPanel,8);
    layout.addPanel(tasks);

    voice.listen('.speech-feedback');
    voice.triggerVoice('Speak to me..');

    faceClient.initialise();
});


document.addEventListener("DOMContentLoaded", function (event) {

    layout.initialise(".container-fluid");
    layout.addRow();
    layout.addPanel(time, { height: '220px' });
    layout.addPanel(blank, { height: '220px' });
    layout.addPanel(userprofile, { height: '220px' });


    layout.addRow();
    layout.addPanel(weather, { height: '210px' });
    layout.addPanel(blank, { height: '250px' });
    layout.addPanel(travel, { height: '250px' });

    layout.addRow();
    layout.addPanel(forecast);
    //layout.addPanel(trains);
    layout.addPanel(blank);
    layout.addPanel(tasks);

    layout.addRow();
    layout.addPanel(calendarPanel, { size: 8 });

    voice.listen('.speech-feedback');
    voice.triggerVoice('Talk to me..');

    faceClient.initialise();
});

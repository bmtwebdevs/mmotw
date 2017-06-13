var soundcloud = soundcloud || (function () {
    SC.initialize({
        client_id: "2t9loNQH90kzJcsFCODdigxfp325aq4z",
    });


    var sound;

    function playIt() {
        sound = SC.stream("/tracks/293", function (sound) {
            sound.play();
        });
    }

    function nextIt() {
        sound = SC.stream("/tracks/293", function (sound) {
            sound.next();
        });
    }

    function prevIt() {
        sound = SC.stream("/tracks/293", function (sound) {
            sound.prev();
        });
    }

    function stopIt() {
        if (!sound) {
            return;
        }

        sound.pause();
    }

    return {
        playIt: playIt,
        nextIt: nextIt,
        prevIt: prevIt,
        stopIt: stopIt
    };
})();

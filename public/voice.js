var voice = voice || (function () {
    var hideTime;
    var feedbackSelector;

    function logit(results) {
        console.log("You said:");
        _(results[0]).forEach(function (result) {
           console.log(result.transcript + ' (' + Math.round(result.confidence) * 100 + '%)');
        });
    }

    function voiceReceived(event) {

        var said = event.results[0][0].transcript;

        logit(event.results);
        //console.log('You said: ', said);

        if (said.indexOf('play') > -1) {
            var firstSpace = said.indexOf(' ');
            var searchTerm = said.substring(firstSpace, said.length);
            console.log(searchTerm);
            spotify.search(searchTerm);
        }

        if (said.indexOf('next') > -1) {
            soundcloud.nextIt();
        }

        if (said.indexOf('previous') > -1) {
            soundcloud.previousIt();
        }

        if (said.indexOf('stop') > -1) {
            soundcloud.stopIt();
        }

        hideTime = new Date();
        hideTime.setMilliseconds(hideTime.getMilliseconds() + 2990);

        var speechFeedback = document.querySelectorAll(feedbackSelector)[0];
        speechFeedback.classList.remove('hidden');

        Typed.new(feedbackSelector + ' span', {
            strings: [event.results[0][0].transcript],
            typeSpeed: 0
        });

        setTimeout(function () {

            var now = new Date();
            if (now < hideTime) {
                return;
            }
            //speechFeedback.classList.add('hidden');
        }, 3000);
    }

    function listen(selector) {

        feedbackSelector = selector;

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
        voiceReceived({ results: [[{ transcript: message, confidence: 1 }]] });
    }

    return {
        listen: listen,
        triggerVoice: triggerVoice
    };
})();
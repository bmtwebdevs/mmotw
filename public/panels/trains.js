var trains = trains || (function () {

    var panel;
    var nextTrain;


    function update() {

        var user = userprofile.getUsername();
        var userConfig = config.users[user] ? config.users[user] : config.users['default'];

        apis.transport.findStations(userConfig['station'])
            .then(function (response) {

                if(!response) {
                    return; // this probably means the API usage is crapped out
                }

                var station = response[0];

                apis.transport.live(station.station_code)
                    .then(function (response) {

                        var html = ' \
                            <p class="title">Trains from ' + station.station_code + '</p> \
                            <ul>';

                        response.forEach(function (item, i) {

                            if(i === 0) {
                                nextTrain = item;
                            }

                            var itemClass = item.status === 'LATE' ? 'bad' : 'good';

                            html += '<li class="train ' + itemClass + '">' + item.due;
                            html += ' <span class="destination">' + item.to + '</span>';
                            var howLate = colonTimeToDate(item.expected) - colonTimeToDate(item.due);
                            var howLateInMinutes = howLate / 60 / 1000;
                            if(howLate > 0) {
                                html += '<span class="status">' + howLateInMinutes + 'm late</span></li>';
                            }
                            html += '</li>';

                        });

                        html += '</ul>';

                        panel.innerHTML = html;
                    });
            }).then(function () {
                setTimeout(update, 30000);
            });
    }

    function colonTimeToDate(time) {
        if(!time) {
            return;
        }
        var timeParts = time.split(':');
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeParts[0], timeParts[1]);
    }

    function sayNextTrain() {

        var user = userprofile.getUsername();
        var userConfig = config.users[user] ? config.users[user] : config.users['default'];
        var msg = 'The next train from ' + userConfig['station'] + 'goes to ' + nextTrain.to;
        var howLate = colonTimeToDate(nextTrain.expected) - colonTimeToDate(nextTrain.due);
        var howLateInMinutes = howLate / 60 / 1000;
        if(howLate > 0) {
            msg += ' but it\'s ' + howLateInMinutes + ' minutes late.';
        }

        speechClient.say(msg);
    }

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h4>Checking trains...</h4>';

        faceClient.addEventListener(update);

        update();
    }

    return {
        attach: attach,
        sayNextTrain: sayNextTrain
    };

})();
var trains = trains || (function () {

    var panel;

    function update() {
        apis.transport.findStations('bath spa')
            .then(function (response) {

                if(!response) {
                    return; // this probably means the API usage is crapped out
                }

                var station = response[0];

                apis.transport.live(station.station_code)
                    .then(function (response) {

                        var html = ' \
                            <p class="title">Train Times</p> \
                            <ul>';

                        response.forEach(function (item) {

                            var itemClass = item.status === 'LATE' ? 'bad' : 'good';

                            html += '<li class="' + itemClass + '">' + item.expected;
                            if (item.expected !== item.due) {
                                html += ' (' + item.due + ')';
                            }
                            html += ' ' + item.to + ' ' + item.status + '</li>';
                        });


                        html += '</ul>';

                        panel.innerHTML = html;
                    });
            }).then(function () {
                setTimeout(update, 10000);
            });
    }

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h5>Loading</h5>';

        update();
    }

    return {
        attach: attach
    };

})();
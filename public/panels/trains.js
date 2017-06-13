var trains = trains || (function () {

    var panel;

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h5>Loading</h5>';

        apis.transport.findStations('bath spa')
            .then(function (response) {

                var station = response[0];
                console.log(station);

                apis.transport.live(station.station_code)
                    .then(function (response) {

                        var html = ' \
                            <h4>Train Times</h4> \
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
            });
    }

    return {
        attach: attach
    };

})();
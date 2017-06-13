var trains = trains || (function () {

    function liveDeparturePanel(selector) {
        var trainPanels = document.querySelectorAll(selector);

        trainPanels.forEach(function (div) {
            div.innerHTML = '<dtitle>Train Times<hr /></dtitle><div>Loading</div>';
        });

        apis.transport.findStations('bath spa')
            .then(function (response) {

                var station = response[0];
                console.log(station);

                apis.transport.live(station.station_code)
                    .then(function (response) {

                        trainPanels.forEach(function (div) {

                            var html = ' \
                            <dtitle>Train Times</dtitle> \
                            <hr /> \
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

                            div.innerHTML = html;
                        });

                    });
            });
    }

    return {
        liveDeparturePanel: liveDeparturePanel
    };

})();
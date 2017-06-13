document.addEventListener("DOMContentLoaded", function (event) {

    var trainPanels = _(document.querySelectorAll(".train-times"));

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

                        _(response).forEach(function (item) {

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

    var socket = io.connect('http://localhost:3000');

    socket.on('userVerified', function (data) {
        var userPanel = _(document.querySelectorAll(".userprofile"));

        userPanel.forEach(function (div) {
            div.innerHTML = '<dtitle>User Profile</dtitle> \
	      		<hr>\
				<div class="thumbnail">\
					<img src= "' + data.images[0] + '" alt="Marcel Newman" class="img-circle">\
				</div><!-- /thumbnail -->\
				<h1>' + data.username + '</h1>\
				<h3>Bristol, United Kingdom</h3>\
				<br>\
				</div>'
        });
    })
});
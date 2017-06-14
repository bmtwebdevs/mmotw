var travel = travel || (function () {

    var panel;

    function update() {
        var user = userprofile.getUsername();
        var userConfig = config.users[user] ? config.users[user] : config.users['default'];
        var origin = userConfig.home;
        var destination = userConfig.work;
        var travel_mode = userConfig.travel_mode;
        var response = apis.travel.getDirections(origin, destination, travel_mode)
            .then(function (response)
            {
                var journey = response.routes[0].legs[0];
                var distance = journey.distance.text;
                var duration = journey.duration.text;
                var travelIcon = '';
                switch (travel_mode) {
                    case 'DRIVING':
                        travelIcon = '<i class="fa fa-5x fa-car" aria-hidden="true"></i>';
                        break;
                    case 'WALKING':
                        travelIcon = '<i class="fa fa-5x fa-male" aria-hidden="true"></i>';
                        break;
                    default:
                        break;
                }
                var time = response.routes[0].legs[0].duration.text;
                var html = '<h3>Your journey to work </h3>';
                    html += '<h4>' + journey.start_address + ' to<br/> ' + journey.end_address + '</h4>';
                    html += '<h4>'+ distance + ' will take ' + duration + '</h4>';
                    html += travelIcon;
                panel.innerHTML = html;
        });
    }

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h5>Loading</h5>';

        faceClient.addEventListener(update);

        update();
    }

    return {
        attach: attach
    };

})();
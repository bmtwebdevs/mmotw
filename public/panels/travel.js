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
                        travelIcon = '<div class="travelIcon"><i class="fa fa-5x fa-car" aria-hidden="true"></i></div>';
                        break;
                    case 'WALKING':
                        travelIcon = '<div class="travelIcon"><i class="fa fa-5x fa-male" aria-hidden="true"></i></div>';
                        break;
                    default:
                        break;
                }
                var time = response.routes[0].legs[0].duration.text;
                var html =  travelIcon;
                    html += '<p class="title">Your journey</p>';
                    html += '<p class="journey_details">From: ' + journey.start_address + '<br/>To: ' + journey.end_address + '</p>';
                    html += '<p class="journey">'+ distance + ' will take ' + duration + '</p>';

                panel.innerHTML = html;
        });
    }

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h4>Finding journey...</h4>';

        faceClient.addEventListener(update);

        update();
    }

    return {
        attach: attach
    };

})();
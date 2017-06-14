var travel = travel || (function () {

    var panel;

    function update() {
        var user = userprofile.getUsername();
        var userConfig = config.users[user];
        console.log('user', user);
        console.log('config', config.users[user]);
        var origin = userConfig ? userConfig.home : config.users['default'].home;
        //'BS1';
        var destination = userConfig ? userConfig.work : config.users['default'].work;
        //'BA2 3DQ';
        var response = apis.travel.getDirections(origin, destination)
            .then(function (response)
            {
                var time = response.routes[0].legs[0].duration.text;
                var html = ' \
                            <h4>'+  origin + ' to ' + destination + ': ' + time + '</h4> \
                            <ul>';
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
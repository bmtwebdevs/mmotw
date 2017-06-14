var travel = travel || (function () {

    var panel;

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h5>Loading</h5>';

        var origin = config[user].home;
        //'BS1';
        var destination = config[user].work;
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

    return {
        attach: attach
    };

})();
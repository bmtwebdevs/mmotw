var travel = travel || (function () {

    var panel;

    function attach(p) {
        panel = p;
        panel.innerHTML = '<h5>Loading</h5>';

        var origin = 'BS1';
        var destination = 'BA2+3DQ';
        var response = apis.travel.getDirections(origin, destination)
            .then(function (response)
            {
                var time = response[0].legs[0].duration.text;
                var html = ' \
                            <h4>'+  origin + ' to + ' + destination + ': ' + time + '</h4> \
                            <ul>';
                panel.innerHTML = html;
        });
    }

    return {
        attach: attach
    };

})();
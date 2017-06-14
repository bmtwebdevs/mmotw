var userprofile = userprofile || (function () {

    var panel;

    function userVerified(data) {

        panel.innerHTML =
            '<h4>User Profile</h4> \
            <div class="thumbnail"> \
                <img src= "' + data.images[0].image + '" alt="' + data.username + '" class="img-circle">\
            </div><!-- /thumbnail -->\
            <h1>' + data.username + '</h1>\
            <h3>Bristol, United Kingdom</h3>\
            <br>\
            </div>';
    }

    function attach(p) {
        panel = p;

        panel.innerHTML = "<h4>Detecting profile...</h4>";

        faceClient.addEventListener(userVerified)
    }

    return {
        attach: attach
    };

})();
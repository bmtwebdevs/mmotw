var userprofile = userprofile || (function () {

    var panel;
    var user;

    function getUsername() {
        return user && user.username.toLowerCase();
    }

    function userVerified(data) {
        user = data;
        panel.innerHTML =
            '<div class="thumbnail"> \
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

        faceClient.addEventListener(userVerified);
    }

    return {
        attach: attach,
        getUsername: getUsername
    };

})();
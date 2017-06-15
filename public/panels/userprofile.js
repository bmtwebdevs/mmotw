var userprofile = userprofile || (function () {

    var panel;
    var user;

    function getUsername() {
        return user && user.username.toLowerCase();
    }

    function userVerified(data) {
        user = data;
        var html = '<div class="thumbnail"> \
                <img src= "' + data.images[0].image + '" alt="' + data.username + '" class="img-circle">\
            </div>';
        html += '<p class="username">' + data.username + '</p>';
        panel.innerHTML = html;

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
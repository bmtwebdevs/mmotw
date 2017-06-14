var time = time || (function () {

    var panel;

    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    function update() {

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        panel.innerHTML = '<h2>' + h + ":" + m + ":" + s + '</h2>';
        var t = setTimeout(update, 500);
    }

    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };

})();
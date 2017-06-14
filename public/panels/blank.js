var blank = blank || (function () {

    var panel;



    function update() {
    }

    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };

})();
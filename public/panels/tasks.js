var tasks = tasks || (function () {

    var panel;



    function update() {

      panel.innerHTML = '<h4>Tasks</h4> \
      <pre id="tasks-content"></pre>';

      //panel.innerHTML = '<h4>Calendar</h4> \<pre id="content"></pre>';


    }

    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };

})();

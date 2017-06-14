var calendarPanel = calendarPanel || (function () {

    var panel;



    function update() {

      panel.innerHTML = '<h4>Calendar</h4> \
      <div class="timetable"></div>';

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

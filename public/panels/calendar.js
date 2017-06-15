var calendarPanel = calendarPanel || (function () {

    var panel;


    function update() {

      html = '<h4>Calendar</h4> \
      <div class="timetable"></div>';

      const today = new Date(); var start = new Date(); var end = new Date();
      start = new Date(start.setHours(1));
      start = start.setDate(today.getDate() - (today.getDay()));
      start = (new Date(start)).toISOString();

      end = new Date(end.setHours(23));
      end = end.setDate(today.getDate() + (6 - today.getDay()));
      end = (new Date(end)).toISOString();

      var user = userprofile.getUsername();
      var userConfig = config.users[user] ? config.users[user] : config.users['default'];
      var access_token = userConfig.gapis_access_token;

      //const access_token = "ya29.GlxqBFNI3-BgcD39gLHDPid8ukyBGjYvJijxsxbk5YITYaWyyjgoUFJwCVrWHcoYoEeLxARi5PBq3bNEK_DsYrBbSOKb_LjzyI8Ia1G0IrKZT006KN1xBM4IAlORRQ";


      if (access_token) {
        apis.calendar.getCalendar(start, end, access_token)
            .then(function (response) {
              //console.log(response);
              const events = response.items;
              if (events.length > 0) {
                const timetable = new Timetable();
                timetable.setScope(9, 17);
                const days =['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                timetable.addLocations(days);
                for (i = 0; i < events.length; i++) {
                  const event = events[i];
                  const whenStart = event.start.dateTime;
                  const whenEnd = event.end.dateTime;
                  if (!whenStart) {
                    whenStart = event.start.date;
                  }
                  if (!whenEnd) {
                    whenEnd = event.end.date;
                  }
                  var dayIndex = new Date(whenStart).getDay();
                  timetable.addEvent(event.summary, days[dayIndex], new Date(whenStart), new Date(whenEnd));
                }
                var renderer = new Timetable.Renderer(timetable);
                renderer.draw('.timetable');
              } else {
                html += '<p> No upcoming events found. </p>';
              }
            });
          } else html += '<p> No calendar found. </p>';

          panel.innerHTML = html;
    }

    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };

})();

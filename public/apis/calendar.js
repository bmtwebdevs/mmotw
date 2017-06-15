var apis = apis || {};
apis.calendar = apis.calendar || (function () {

    const access_token = "ya29.GlxqBIMFH1nS97pQaHcbYjltkbkXfOJHg7uBJapisIum9njTtfaio30QTi0y3U53YEeXYkCSvhYB4DmwTIJw4kfUpuL0nhXnlDqn0q_N0TsE_bglaAGI4HDadUzN9g";
    const base = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';


    function getCalendar(timeMin, timeMax) {
        return apis.ajax.get(base + '?access_token=' + access_token + '&timeMin=' + timeMin + '&timeMax=' + timeMax + '&singleEvents=true'
        ).then(function (response) {
            return JSON.parse(response);
        });
    }

    return {
        getCalendar: getCalendar
    };
})();

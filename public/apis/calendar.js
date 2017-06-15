var apis = apis || {};
apis.calendar = apis.calendar || (function () {

    const base = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';


    function getCalendar(timeMin, timeMax, access_token) {
        return apis.ajax.get(base + '?access_token=' + access_token + '&timeMin=' + timeMin + '&timeMax=' + timeMax + '&singleEvents=true'
        ).then(function (response) {
            return JSON.parse(response);
        });
    }

    return {
        getCalendar: getCalendar
    };
})();

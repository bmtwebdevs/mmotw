var apis = apis || {};
apis.tasks = apis.tasks || (function () {

  const base = 'https://www.googleapis.com/tasks/v1/lists/@default/tasks';


    function getTasks(dueMin, dueMax, access_token) {
        return apis.ajax.get(base + '?access_token=' + access_token + '&dueMin=' + dueMin + '&dueMax=' + dueMax
        ).then(function (response) {
            return JSON.parse(response);
        });
    }

    return {
        getTasks: getTasks
    };
})();

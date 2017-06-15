var apis = apis || {};
apis.tasks = apis.tasks || (function () {

    const access_token = "ya29.GlxqBIMFH1nS97pQaHcbYjltkbkXfOJHg7uBJapisIum9njTtfaio30QTi0y3U53YEeXYkCSvhYB4DmwTIJw4kfUpuL0nhXnlDqn0q_N0TsE_bglaAGI4HDadUzN9g";
    const base = 'https://www.googleapis.com/tasks/v1/lists/@default/tasks';


    function getTasks(dueMin, dueMax) {
        return apis.ajax.get(base + '?access_token=' + access_token + '&dueMin=' + dueMin + '&dueMax=' + dueMax
        ).then(function (response) {
            return JSON.parse(response);
        });
    }

    return {
        getTasks: getTasks
    };
})();

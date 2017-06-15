var tasks = tasks || (function () {

    var panel;

    function append(message) {
      var tasks = document.getElementById('tasks-content');
      tasks.innerHTML += message;
    }

    function update() {
      var html = '<p class="title">Weekly Tasks</p>';
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
        html += '<div id="tasks-content"></div>';
        apis.tasks.getTasks(start, end, access_token)
            .then(function (response) {
              var taskLists = response.items;
              if (taskLists && taskLists.length > 0) {
                for (var i = 0; i < taskLists.length; i++) {
                  var taskList = taskLists[i];
                  const days =['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                  if (taskList.title != "") {
                    append(taskList.title + " <span class='due'>by " + days[new Date(taskList.due).getDay()] + '</span><br/>');
                  }
                }
              } else {
                append('No tasks found.');
              }
        });
      } else {
        html += '<p>No task lists found.</p>';
      }
      panel.innerHTML = html;
    }

    function attach(p) {

        panel = p;

        faceClient.addEventListener(update);

        update();
    }

    return {
        attach: attach
    };

})();

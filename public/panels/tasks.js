var tasks = tasks || (function () {

    var panel;

    function appendPre(message) {
      var pre = document.getElementById('tasks-content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
    }

    function update() {
      var html = '<h4>Tasks</h4>';
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
        html += '<pre id="tasks-content"></pre>';
        apis.tasks.getTasks(start, end, access_token)
            .then(function (response) {
              var taskLists = response.items;
              if (taskLists && taskLists.length > 0) {
                for (var i = 0; i < taskLists.length; i++) {
                  var taskList = taskLists[i];
                  console.log(taskList);
                  const days =['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                  if (taskList.title != "") appendPre(taskList.title +" DUE: " + days[new Date(taskList.due).getDay()]);
                }
              } else {
                appendPre('No task lists found.');
              }
        });
      } else html += '<p>No task lists found.</p>';
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

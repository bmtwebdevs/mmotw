var tasks = tasks || (function () {

    var panel;

    function appendPre(message) {
      var pre = document.getElementById('tasks-content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
    }

    function update() {
      panel.innerHTML = '<h4>Tasks</h4> \
      <pre id="tasks-content"></pre>';
      const today = new Date(); var start = new Date(); var end = new Date();
      start = new Date(start.setHours(1));
      start = start.setDate(today.getDate() - (today.getDay()));
      start = (new Date(start)).toISOString();

      end = new Date(end.setHours(23));
      end = end.setDate(today.getDate() + (6 - today.getDay()));
      end = (new Date(end)).toISOString();

      apis.tasks.getTasks(start, end)
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
    }

    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };

})();

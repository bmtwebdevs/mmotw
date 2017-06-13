// Client ID and API key from the Developer Console
var CLIENT_ID = '1077212302977-2sivdgo0jqj1u5tbc72avl0bss99jace.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks.readonly";

var authorizeButton = document.getElementById('authorize-button');
// var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    //signoutButton.onclick = handleSignoutClick;
    //timeTableDisplay_init();
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    //signoutButton.style.display = 'block';
    today = new(Date);
    listCalendarEvents();
    listTasks();
  } else {
    authorizeButton.style.display = 'block';
    //signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}*/

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function timeTableDisplay_init(){
  var timetable = new Timetable();
  timetable.setScope(9, 17);
  timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  timetable.addEvent('Frankadelic', 'Monday', new Date(2015,7,17,10,45), new Date(2015,7,17,12,30));
  var renderer = new Timetable.Renderer(timetable);
  renderer.draw('.timetable');
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listCalendarEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    console.log(response);
    appendPre('Upcoming events:');

    if (events.length > 0) {
      var timetable = new Timetable();
      timetable.setScope(9, 17);
      var days =['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      timetable.addLocations(days);

      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var whenStart = event.start.dateTime; var whenEnd = event.end.dateTime;
        if (!whenStart) {
          whenStart = event.start.date;
        }
        if (!whenEnd) {
          whenEnd = event.end.date;
        }
        //console.log(when);
        var dayIndex = new Date(whenStart).getDay();
        timetable.addEvent(event.summary, days[dayIndex], new Date(whenStart), new Date(whenEnd));
        //appendPre(event.summary + ' (' + when + ')')
      }
      var renderer = new Timetable.Renderer(timetable);
      renderer.draw('.timetable');
    } else {
      appendPre('No upcoming events found.');
    }
  });
}

function listTasks(){
  //gapi.client.tasks.tasklists.list({
  //    'maxResults': 10
  gapi.client.tasks.tasks.list({
  'tasklist': '@default'
  }).then(function(response) {
    //console.log(response);
    appendPre('Tasks:');
    var taskLists = response.result.items;
    if (taskLists && taskLists.length > 0) {
      for (var i = 0; i < taskLists.length; i++) {
        var taskList = taskLists[i];
        if (taskList.title != "") appendPre(taskList.title +":" +taskList.status);
      }
    } else {
      appendPre('No task lists found.');
    }
  });

}

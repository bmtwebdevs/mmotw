var faceClient = faceClient || (function () {

	var socket;
	var listeners = [];

	function initialise() {
		socket = io.connect('http://localhost:3000');

		socket.on('userVerified', function (data) {

			_(listeners).forEach(function (listener) {
				listener(data);
			});
		})
	}

	function addEventListener(listener) {
		listeners.push(listener);
	}

	return {
		initialise: initialise,
		addEventListener: addEventListener
	};
})();
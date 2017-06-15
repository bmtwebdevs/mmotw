var speechClient = speechClient || (function () {

	var socket;
	var synth = window.speechSynthesis;


	function initialise() {
		socket = io.connect('http://localhost:3000');

		socket.on('speech', function (data) {

			var utterThis = new SpeechSynthesisUtterance(data);

			synth.speak(utterThis);

		})
	}

	return {
		initialise: initialise
	};
})();
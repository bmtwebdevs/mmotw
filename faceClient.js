var socket = io.connect('http://localhost:3000');

socket.on('userVerified', function (data) {
    var userPanel = _(document.querySelectorAll(".userprofile"));

    userPanel.forEach(function (div) {
        div.innerHTML = '<dtitle>User Profile</dtitle> \
	      		<hr>\
				<div class="thumbnail">\
					<img src= "' + data.images[0] + '" alt="Marcel Newman" class="img-circle">\
				</div><!-- /thumbnail -->\
				<h1>' + data.username + '</h1>\
				<h3>Bristol, United Kingdom</h3>\
				<br>\
				</div>'
    });
})
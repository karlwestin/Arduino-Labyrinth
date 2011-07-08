

/* 	
	Important! Load the socket.io javascript file via the socket server!
	ex: 	<script src="http://jo.local:8080/socket.io/socket.io.js"></script>
*/


window.addEventListener('deviceorientation', onmove, false);


var $ = function(el) { return document.querySelectorAll(el)[0]; };
var position = { x: 0, y: 0 }


function onmove(e) {
	$("#beta").innerHTML = e.beta;
	$("#gamma").innerHTML = e.gamma;
	position = { x: e.beta, y: e.gamma };	
}

var socket = io.connect('http://jo.local:8080');

var sendData = setInterval(function() {
	socket.emit('accelerometer', position);
}, 50);

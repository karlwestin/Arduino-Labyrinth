/* 

		ZE MIGHTY NODE SCRIPT FOR ARDUINO LABYRINTHS

		Design goals:
		• handle websocket input
		• normilze timing for pythong script – make sure data is sent no more/less than every x seconds
		• handle disconnections
		• limit number of users to 1 at any given time
		
*/

var io = require('socket.io').listen(8080), 
	clients = 0;
	
io.set('log level', 1);

io.sockets.on('connection', function(socket) {
	if( clients === 0 ) {

		clients++;

//		console.log(socket.id + " connected");
	
		var position = { x: 0, y: 0 };
	
		socket.on('accelerometer', function(data) {
//			console.log("data from " + socket.id);
			position = data;
		});
		
		var sendToPython = setInterval(function() {
			process.stdout.write("(" + -position.x + ";" + position.y + ")\n");
		}, 50);	
		
		socket.on('disconnect', function() {
			clients--;
//			console.log(socket.id + " disconnected");
			clearInterval(sendToPython);
		});
	
	} else {
		
//		console.log(socket.id + " connected");
		
//		console.log(socket.id + " ignored user connected");
		
		socket.on('accelerometer', function(data) {
//			console.log(socket.id + " data ignored");
		});
		
		socket.on('disconnect', function() {
//			console.log(socket.id + " ignored user disconnected");		
		});
		
	}
	
});


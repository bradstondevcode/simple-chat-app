import socketIOClient from "socket.io-client";

var serverEndpoint = ""

export var socket = socketIOClient(serverEndpoint, {
	transports: ['websocket']
});

export function setSocketServerURL(serverURL){
	var newSocket = socketIOClient(serverURL, {
		transports: ['websocket']
	})

	socket = newSocket

	return newSocket
}

export function printServerURL(){
	console.log(serverEndpoint)
}

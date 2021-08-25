import socketIOClient from "socket.io-client";

var serverEndpoint = ""

export var socket = null

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

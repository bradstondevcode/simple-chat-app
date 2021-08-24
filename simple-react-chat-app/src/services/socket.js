import socketIOClient from "socket.io-client";

const serverEndpoint = "https://simple-node-chat-server-bsh.us-south.cf.appdomain.cloud/";

export const socket = socketIOClient(serverEndpoint, {
	transports: ['websocket']
});

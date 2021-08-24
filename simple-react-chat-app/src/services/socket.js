import socketIOClient from "socket.io-client";

const serverEndpoint = "http://simple-chat-node-server-a-simple-chat-app.trivia-test-bsh-082721-162e406f043e20da9b0ef0731954a894-0000.us-east.containers.appdomain.cloud/";

export const socket = socketIOClient(serverEndpoint, {
	transports: ['websocket']
});

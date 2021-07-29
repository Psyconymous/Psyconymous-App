import { io } from "socket.io-client";

const URL = "http://localhost:5000";
const socket = io(URL, { autoConnect: true });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

console.log(typeof socket);
export default socket;

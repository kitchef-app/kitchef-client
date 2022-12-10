import { io } from "socket.io-client";
export const socket = io(
  "https://kitchef-server-production-3e42.up.railway.app"
);

import WebSocket, { Server } from "ws";
import http from "http";

export interface IUserWS extends WebSocket {
    isAlive: boolean;
    id?: string;
}

export interface IWebSocketConnection {
    init: (server: http.Server) => void;
    getConnection: () => Server<IUserWS> | undefined;
    sendMessage: (ws: IUserWS, data: Object) => Promise<void>;
}

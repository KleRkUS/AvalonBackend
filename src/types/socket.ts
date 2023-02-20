import WebSocket from "ws";

export interface IUserWS extends WebSocket {
    isAlive: boolean;
    id?: string;
}

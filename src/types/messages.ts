import {
    HostToServerMessageTypes,
    PlayerMessageTypes,
    PlayerResponseTypes,
    ServerToHostMessageTypes
} from "@app.d/enums/messageTypes";

export type ConnectMessage = {
    name: string;
}

export type ConnectResponse = {
    success: boolean;
}

export interface HostGameDataToPlayer {
    playerId: string;
    gameData: any;
}

export type UnsupportedMessagePayload = {
    msg: "Unsupported"
}

export type PlayerMessagePayload =
    ConnectMessage |
    HostGameDataToPlayer;

export type PlayerResponsePayload =
    string |
    UnsupportedMessagePayload |
    ConnectResponse;


export enum ServerClientMessageTypes {
    ValidateGameExistence = 'isGameExists'
}

export enum TrueFalseStatuses {
    True = 'true',
    False = 'false',
}

export interface IClientToServerMessage {
    type: PlayerMessageTypes | HostToServerMessageTypes;
    msg?: any;
}

export interface IServerToClientMessage {
    type: PlayerResponseTypes | ServerToHostMessageTypes | PlayerMessageTypes;
    msg?: any;
}

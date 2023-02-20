import {
    HostToServerMessageTypes,
    PlayerMessageTypes,
    PlayerResponseTypes,
    ServerToHostMessageTypes
} from "@app.d/enums/messageTypes";

export interface ConnectMessage {
    name: string;
}

export interface ConnectResponse {
    success: boolean;
}

export interface HostGameDataToPlayer {
    playerId: string;
    // TODO: Create gameData types as long as it will be clarified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gameData: any;
}

export interface UnsupportedMessagePayload {
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
    // TODO: Create msg types as long as it will be clarified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    msg?: any;
}

export interface IServerToClientMessage {
    type: PlayerResponseTypes | ServerToHostMessageTypes | PlayerMessageTypes;
    // TODO: Create msg types as long as it will be clarified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    msg?: any;
}

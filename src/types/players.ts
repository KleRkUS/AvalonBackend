import {IServerToClientMessage} from "@app.d/messages";
import {InGamePlayerToServerMessage} from "@app.d/game";

export interface IAbstractPlayerManager {
    sendMessage(msg: IServerToClientMessage): void;
    addInGameEventListeners(listener: (data: MessageEvent<InGamePlayerToServerMessage>) => void): void;
    removeInGameEventListeners(listener: (data: MessageEvent<InGamePlayerToServerMessage>) => void): void;
}

export interface IHostManager extends IAbstractPlayerManager {
    askForGameData(playerId: string): void;
}

// TODO: Add specific typization for Player class
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPlayerManager extends IAbstractPlayerManager {
}

import {IServerToClientMessage} from "@app.d/messages";
import {IHostManager, IPlayerManager} from "@app.d/players";

export enum UniqueBlueCharacters {
    Merlin = 'Merlin',
    Persival = 'Persival'
}

export enum UniqueRedCharacters {
    Assasin = 'Assasin',
    Morgana = 'Morgana',
}

export type UniqueCharacters = UniqueRedCharacters | UniqueBlueCharacters;

export enum GenericCharacters {
    GenericBlue = 'genericBlue',
    GenericRed = 'genericRed',
}

export type CharacterType = GenericCharacters | UniqueCharacters

export type CreatedLobbies = {
    [key in string]: ILobbyManager;
}

export interface GameData {
    uniqueCharacters: UniqueCharacters[];
}

export interface IAllLobbiesManager {
    createGame(): Promise<string>;
    checkIfGameExists(id: string): boolean;
}

export interface ILobbyManager {
    ongoing: boolean;
    savePlayerName(id: string, name: string): void;
    sendMessageToPlayer(playerId: string, msg: IServerToClientMessage): void;
    getGameDataFromHost(playerId: string): void;
    startGame(gameData: GameData): void;
}

export interface ILobbyManagerPlayer {
    id: string;
    manager: IHostManager | IPlayerManager;
    deleted: boolean;
}

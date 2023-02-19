import {IUserWS} from "@app.d/socket";
import { IAbstractPlayerManager } from "@app.d/players";
import {ILobbyManager} from "@app.d/games";
import {
    ConnectResponse,
    IClientToServerMessage,
    IServerToClientMessage,
} from "@app.d/messages";
import {PlayerMessageTypes, PlayerResponseTypes} from "@app.d/enums/messageTypes";
import {InGamePlayerToServerMessage} from "@app.d/game";

export interface IPlayerManagerProps {
    id: string,
    ws: IUserWS,
    gameManager: ILobbyManager,
}

abstract class AbstractPlayerManager implements IAbstractPlayerManager {
    protected readonly _id: string;
    protected readonly _ws: IUserWS;
    protected readonly _gameManager: ILobbyManager;

    protected constructor({
        id, ws, gameManager,
    }: IPlayerManagerProps) {
        this._id = id;
        this._ws = ws;
        this._gameManager = gameManager;
        this._saveWsClient();
    }

    protected _createEventListeners(cb: (message: IClientToServerMessage) => void) {
        const listener = (event: MessageEvent<IClientToServerMessage>) => {
            cb(event.data);
        }

        // @ts-ignore
        this._ws.addEventListener('message', listener);
    }

    protected _reduceCommonPlayerMessages(
        { type, msg }: IClientToServerMessage
    ) {
        switch (type) {
            case PlayerMessageTypes.Connect:
                this._connect(msg?.name);
                break;
            default:
                this.sendMessage({
                    type: PlayerResponseTypes.UnsupportedMessage,
                    msg: `Wrong TYPE: ${type} message sent`
                })
                break;
        }
    }

    // private async _createMessageReducer(data: string) {
    //     const parsedData = await JSON.parse(data);
    //     const { type, msg } = parsedData;
    //
    //     const str = JSON.stringify({ connected: true });
    //     this._ws.send(str);
    //
    //     switch (type) {
    //         case PlayerMessageTypes.Connect:
    //             break;
    //         case PlayerMessageTypes.ChooseExistingPlayer:
    //             break;
    //         case PlayerMessageTypes.VoteForParty:
    //             break;
    //         case PlayerMessageTypes.PlayCampaing:
    //             break;
    //         default:
    //             break;
    //     }
    // }

    private _connect(name?: string) {
        if (name === undefined || typeof name !== "string") {
            this.sendMessage({
                type: PlayerResponseTypes.BadPayload,
                msg: 'No player name found when connecting'
            });

            return;
        }

        this._gameManager.savePlayerName(this._id, name);
        const msg: ConnectResponse = { success: true };

        this.sendMessage({
            type: PlayerMessageTypes.Connect,
            msg,
        })
    }

    private _saveWsClient() {
        this._ws.isAlive = true;
        this._ws.id = this._id;
    }

    sendMessage({ type, msg }: IServerToClientMessage) {
        const obj = msg ? { type, msg } : { type };
        const str = JSON.stringify(obj);
        this._ws.send(str);
    }

    addInGameEventListeners(listener: (data: MessageEvent<InGamePlayerToServerMessage>) => void) {
        // @ts-ignore
        this._ws.addEventListener('message', listener);
    }

    removeInGameEventListeners(listener: (data: MessageEvent<InGamePlayerToServerMessage>) => void) {
        // @ts-ignore
        this._ws.removeEventListener('message', listener);
    }
}

export default AbstractPlayerManager;

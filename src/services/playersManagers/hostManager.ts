import PlayerManager, {IPlayerManagerProps} from "./abstractPlayerManager";
import {
    HostGameDataToPlayer,
    IClientToServerMessage
} from "@app.d/messages";
import {HostToServerMessageTypes, ServerToHostMessageTypes} from "@app.d/enums/messageTypes";
import {IHostManager} from "@app.d/players";
import {GameData} from "@app.d/games";

class HostManager extends PlayerManager implements IHostManager {
    constructor(props: IPlayerManagerProps) {
        super(props);
        this._createEventListeners(this._reduceHostMessages);
    }

    private _reduceHostMessages({ type, msg }: IClientToServerMessage) {
        switch (type) {
            case HostToServerMessageTypes.SendGameData:
                if (msg) {
                    this._sendGameDataToPlayer(msg);
                }
                break;
            default:
                this._reduceCommonPlayerMessages({ type, msg });
                break;
        }
    }

    private _sendGameDataToPlayer({ playerId, gameData }: HostGameDataToPlayer) {
        this._gameManager.sendMessageToPlayer(playerId, gameData);
    }

    private _startGame(gameData: GameData) {
        // this._gameManager
    }

    askForGameData(playerId: string) {
        const msgObj = {
            type: ServerToHostMessageTypes.GetGameData,
            msg: playerId
        }
        this.sendMessage(msgObj);
    }
}

export default HostManager;

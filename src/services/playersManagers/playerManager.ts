import AbstractPlayerManager, {IPlayerManagerProps} from "./abstractPlayerManager";
import {IPlayerManager} from "@app.d/players";
import {IClientToServerMessage} from "@app.d/messages";
import {PlayerMessageTypes} from "@app.d/enums/messageTypes";

class PlayerManager extends AbstractPlayerManager implements IPlayerManager {
    constructor(props: IPlayerManagerProps) {
        super(props);
        this._createEventListeners(this._reducePlayerMessages);
    }

    private _reducePlayerMessages({ type, msg }: IClientToServerMessage) {
        switch (type) {
            case PlayerMessageTypes.GetGameDataFromHost:
                if (msg) {
                    this._askHostForData();
                }
                break;
            default:
                this._reduceCommonPlayerMessages({ type, msg });
                break;
        }
    }

    private _askHostForData() {
        this._gameManager.getGameDataFromHost(this._id);
    }
}

export default PlayerManager;

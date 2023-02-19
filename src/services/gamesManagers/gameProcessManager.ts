import {IPlayerManager} from "@app.d/players";
import {InGamePlayerToServerMessage, InGamePlayerToServerPayload} from "@app.d/game";
import {PlayerMessageTypes} from "@app.d/enums";
import {GameStages} from "@app.d/enums/gameProcess";

class GameProcessManager {
    private readonly _players: IPlayerManager[];

    constructor(players: IPlayerManager[]) {
        this._players = players;
    }

    private _addListeners() {
        this._players.map((player: IPlayerManager) => {

        })
    }

    private _reduceInGameMessages(msg: InGamePlayerToServerPayload) {
        const { event, payload } = msg;
    }

    private _processPlayerMessage(data: MessageEvent<InGamePlayerToServerMessage>) {
        const { type, msg } = data.data;

        if (type === PlayerMessageTypes.InGameEvent) {
            this._reduceInGameMessages(msg);
        }
    }

    private _generateInGamePlayersList(players: IPlayerManager) {

    }
}

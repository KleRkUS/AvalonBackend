import {ILobbyManagerPlayer, ILobbyManager} from "@app.d/games";
import {IUserWS} from "@app.d/socket";
import {getRandomPlayerId} from "@services/helpers";
import WebSocket, {Server} from "ws";
import {server} from "../../index";
import {IServerToClientMessage} from "@app.d/messages";
import {IHostManager, IPlayerManager} from "@app.d/players";
import { HostManager, PlayerManager } from "../playersManagers";

class LobbyManager implements ILobbyManager {
    private readonly _id: string;
    private _players: ILobbyManagerPlayer[];
    private _host: IHostManager | undefined;
    private _connection: Server<IUserWS> | null;
    private _connectionKillerTimeout: NodeJS.Timer | undefined;
    ongoing: boolean;

    constructor(id: string) {
        this.ongoing = true;
        this._id = id;
        this._players = [];
        this._connection = this._createConnection();
        this._initGame();
    }

    private _createConnection() {
        return new WebSocket.Server<IUserWS>({
            server,
            clientTracking: true,
            path: `/game/${this._id}`
        });
    }

    private _initGame() {
        if (this._connection) {
            console.log('WebSocket connection created for gameId: ', this._id);
        }

        this._setCloserTimeout();
        this._connection?.on('connection', this._connectPlayer.bind(this));
    }

    private _connectPlayer(ws: IUserWS) {
        let playerId = "";
        while (playerId === "" || this._players.some((player: ILobbyManagerPlayer) => (
            player.id === playerId
        ))) {
            playerId = getRandomPlayerId();
        }

        const managerProps = {
            id: playerId,
            gameManager: this,
            ws,
        }

        const getManager = (): IHostManager | IPlayerManager => {
            if (this._players.length === 0) {
                const manager: IHostManager = new HostManager(managerProps);
                this._host = manager;

                return manager;
            } else {
                return new PlayerManager(managerProps);
            }
        }

        const manager = getManager();

        this._players.push({
            manager,
            deleted: false,
            id: playerId
        });

        if (this._connectionKillerTimeout) {
            clearTimeout(this._connectionKillerTimeout);
        }
    }

    savePlayerName(id: string, name: string) {
        this._players = this._players.map((player) => (
            id === player.id
                ? { ...player, name }
                : player
        ));
    }

    getGameDataFromHost(playerId: string) {
        if (this._host) {
            this._host.askForGameData(playerId);
        }
    }

    sendMessageToPlayer(playerId: string, msg: IServerToClientMessage) {
        const player = this._players.find((player: ILobbyManagerPlayer) => (
            player.id === playerId
        ));

        if (player) {
            const { manager } = player;
            manager.sendMessage(msg);
        }
    }

    // startGame(gameData: GameData) {
    //
    // }

    private _setCloserTimeout() {
        this._connectionKillerTimeout =
            setTimeout(() => this._deleteConnection(), 60_000 * 15);
    }

    private _deleteConnection() {
        this._connection = null;
        this.ongoing = false;
    }
}

export default LobbyManager;

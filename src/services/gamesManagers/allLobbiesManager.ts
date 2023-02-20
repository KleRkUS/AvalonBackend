import {CreatedLobbies, IAllLobbiesManager} from "@app.d/games";
import {getRandomGameId} from "@services/helpers";
import GameManager from "./lobbyManager";

class AllLobbiesManager implements IAllLobbiesManager {
    private readonly _allGames: CreatedLobbies;

    constructor() {
        this._allGames = {};
    }

    createGame(): string {
        const id = this._generateGameId();
        this._allGames[id] = new GameManager(id);

        return id;
    }

    checkIfGameExists(id: string): boolean {
        return Object.keys(this._allGames).some((key) => key === id);
    }

    private _generateGameId() {
        let id = "";
        const getGameId = () => (
            getRandomGameId()
        );

        while (id === "" || new Set(Object.keys(this._allGames)).has(id)) {
            id = getGameId();
        }

        return id;
    }

}

const allGamesManager = new AllLobbiesManager();

export default allGamesManager;

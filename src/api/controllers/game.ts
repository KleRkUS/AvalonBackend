import { Request, Response } from "express";
import allGamesManager from "@services/gamesManagers/allLobbiesManager";
import {GameLookupPossibilities, ResponseErrorMessages} from "@app.d/enums";
import {IFindGameRequestBody} from "@app.d/requests";

export const createGame = (req: Request<Record<string, never>>, res: Response) => {
    const id = allGamesManager.createGame();

    if (id) {
        res.status(200).send(id);
    } else {
        res.status(500).send(ResponseErrorMessages.UnexpectedServerErrror);
    }
}

export const findGame = (req: Request<IFindGameRequestBody>, res: Response) => {
    const { id }: IFindGameRequestBody = req.params;

    if (id || typeof id !== "string") {
        res.status(400).send('Game ID is not provided or invalid.');
    }

    const result = allGamesManager.checkIfGameExists(id);

    if (result) {
        res.status(200).send(GameLookupPossibilities.Found);
    } else {
        res.status(200).send(GameLookupPossibilities.NotFound);
    }
}

import { Request, Response } from "express";
import allGamesManager from "@services/gamesManagers/allLobbiesManager";
import {GameLookupPossibilities, ResponseErrorMessages} from "@app.d/enums";
import {IFindGameRequestBody} from "@app.d/requests";

export const createGame = async (req: Request, res: Response) => {
    const id = await allGamesManager.createGame();

    if (id) {
        res.status(200).send(id);
    } else {
        res.status(500).send(ResponseErrorMessages.UnexpectedServerErrror);
    }
}

export const findGame = async (req: Request<IFindGameRequestBody>, res: Response) => {
    const { id }: IFindGameRequestBody = req.params;

    if (id === undefined || typeof id !== "string") {
        res.status(400).send('Game ID is not provided or invalid.');
    }

    const result = allGamesManager.createGame();

    if (result) {
        res.status(200).send(GameLookupPossibilities.Found);
    } else {
        res.status(200).send(GameLookupPossibilities.NotFound);
    }
}

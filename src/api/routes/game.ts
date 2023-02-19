import {Router, Request, Response, NextFunction} from 'express';
import {createGame, findGame} from '@controllers/game';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (err) {
        console.error(
            "Error when handling /game request:\n",
            err,
            "\nRequest:",
            req.url
        );
        res.status(500).send(err);
    }
})

router.post('/create', createGame);
router.get('/find', findGame)

export default router;

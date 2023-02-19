import {randomBytes} from "crypto";

export const getRandomPlayerId = (): string => (
    randomBytes(3).toString('hex')
)

export const getRandomGameId = (): string => (
    randomBytes(8).toString('hex')
)

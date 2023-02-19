import {InGamePlayerToServerMessageTypes, PlayerMessageTypes} from "@app.d/enums";

export interface InGamePlayerToServerPayload {
    event: InGamePlayerToServerMessageTypes;
    payload: any;
}

export interface InGamePlayerToServerMessage {
    type: PlayerMessageTypes.InGameEvent;
    msg: InGamePlayerToServerPayload;
}

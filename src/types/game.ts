import {InGamePlayerToServerMessageTypes, PlayerMessageTypes} from "@app.d/enums";

export interface InGamePlayerToServerPayload {
    event: InGamePlayerToServerMessageTypes;
    // TODO: Create payload types as long as it will be clarified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}

export interface InGamePlayerToServerMessage {
    type: PlayerMessageTypes.InGameEvent;
    msg: InGamePlayerToServerPayload;
}

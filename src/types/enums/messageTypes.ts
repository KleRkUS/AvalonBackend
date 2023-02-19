export enum PlayerMessageTypes {
    Connect = 'connect',
    ChooseExistingPlayer = 'chooseExisting',
    GetGameDataFromHost = 'getGameData',
    InGameEvent = 'inGameEvent'
}

export enum PlayerResponseTypes {
    UnsupportedMessage = 'unsupportedMessage',
    BadPayload = 'badPayload',
    SendGameDataFromHost = 'sendGameData'
}

export enum ServerToHostMessageTypes {
    GetGameData = 'getGameData'
}

export enum HostToServerMessageTypes {
    SendGameData = 'sendGameData'
}

export enum InGamePlayerToServerMessageTypes {
    VoteForParty = 'voteForParty',
    VoteForCampaignOutcome = 'voteForCampaing'
}

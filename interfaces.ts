export interface ProfileItem {
    accessToken: string,
    username: string,
    uid: string,
}

export interface BranchItem {
    id: string,
    name: string,
    address: string,
    telNum: string,
}

export interface BranchCustomItem {
    id: string,
    name: string,
    numberOfAllMachine: number
    numberOfAvailable: number
}
export interface ProfileItem {
    accessToken: string,
    username: string,
    uid: string,
    selectedBranchId: string,
}

export interface BranchItem {
    id: string,
    name: string,
    address: string,
    telNum: string,
}

export interface MachineItem {
    id: string,
    branchId: string,
    status: string,
    machineType: string,
    isOpen: string,
    remainingTime: number
}

export interface BranchCustomItem {
    id: string,
    name: string,
    numberOfAllMachine: number
    numberOfAvailable: number
}
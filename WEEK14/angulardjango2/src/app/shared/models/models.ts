export interface IList {
    id: number;
    name: string;
}

export interface ITask {
    id: number;
    name: string;
    due_on: string;
    status: string;
}


export interface IListInfo {
    id: number;
    toString: string;
}

export interface IAuth {
    token: string;
}
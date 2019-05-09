export interface IList {
    id: number;
    name: string;
    tasks: ITask[];
}

export interface ITask {
    id: number;
    name: string;
    due_on: string;
    status: string;
    task_list: number;
}


export interface IListInfo {
    id: number;
    toString: string;
}

export interface IAuth {
    token: string;
}
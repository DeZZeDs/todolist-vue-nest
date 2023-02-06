export interface ICreateTaskModel {
    name: string;
    status: boolean;
}

export interface ITaskModel extends ICreateTaskModel {
    id: number;
}
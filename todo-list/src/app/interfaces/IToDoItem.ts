export interface IToDoItem {
    id: number;
    description: string;
    assignedTo: string;
    done: boolean;
}

export class ToDoItem implements IToDoItem {
    constructor(public id: number, public description: string, public assignedTo: string, public done: boolean) {}
}

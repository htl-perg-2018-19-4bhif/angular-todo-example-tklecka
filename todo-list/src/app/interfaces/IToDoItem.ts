export interface IToDoItem {
    id: number;
    description: string;
    assignedTo?: string;
    done: boolean;
}

export interface newTodo {
    title: string;
    description: string
}

export interface TodoModel {
    id?: string;
    isComplete: boolean;
    title: string;
    userId?: string;
    description: string;
    date?: string | Date;
    comments?: string[]
}
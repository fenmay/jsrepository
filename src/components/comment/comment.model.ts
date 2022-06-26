export interface CommentModel {
    commentatorId: string;
    date: string;
    id?: string;
    text: string;
    todoId: string;
    userId: string;
    likes?: string[]
}
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    confirmedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
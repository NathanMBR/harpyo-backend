export interface EmailConfirmationInterface {
    id: number;
    userId: number;
    email: string;
    token: string;
    confirmedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
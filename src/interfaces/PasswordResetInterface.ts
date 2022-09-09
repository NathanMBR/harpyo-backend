export interface PasswordResetInterface {
    id: number;
    userId: number;
    token: string;
    resetedAt: Date | null;
    method: "RESET" | "CHANGE";
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
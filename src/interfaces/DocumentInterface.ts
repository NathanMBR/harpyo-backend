export interface DocumentInterface {
    id: number;
    title: string;
    text: string | null;
    folderId: number | null;
    userId: number;
    isEncrypted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
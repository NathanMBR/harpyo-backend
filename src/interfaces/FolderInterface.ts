export interface FolderInterface {
    id: number;
    name: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
import { ReadCurrentUserContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaReadCurrentUserRepository implements ReadCurrentUserContract {
    async readCurrent(data: ReadCurrentUserContract.Request) {
        const { id } = data;

        const user = await prisma.user.findFirst(
            {
                where: {
                    id,
                    deletedAt: null
                }
            }
        );

        return user;
    }
}
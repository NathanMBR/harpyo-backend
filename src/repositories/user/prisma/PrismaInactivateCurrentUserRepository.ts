import { InactivateCurrentUserContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaInactivateCurrentUserRepository implements InactivateCurrentUserContract {
    async inactivateCurrent(data: InactivateCurrentUserContract.Request) {
        await prisma.user.update(
            {
                data: {
                    deletedAt: new Date()
                },

                where: {
                    id: data.id
                }
            }
        );
    }
}
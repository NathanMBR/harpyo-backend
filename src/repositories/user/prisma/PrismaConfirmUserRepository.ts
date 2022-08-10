import { ConfirmUserContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaConfirmUserRepository implements ConfirmUserContract {
    async confirm(data: ConfirmUserContract.Request) {
        const user = await prisma.user.update(
            {
                data: {
                    confirmedAt: new Date()
                },

                where: {
                    id: data.id
                }
            }
        );

        return user;
    }
}
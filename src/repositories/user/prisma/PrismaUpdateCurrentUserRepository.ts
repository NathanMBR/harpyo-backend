import { UpdateCurrentUserContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaUpdateCurrentUserRepository implements UpdateCurrentUserContract {
    async updateCurrent(data: UpdateCurrentUserContract.Request) {
        const user = await prisma.user.update(
            {
                data: {
                    name: data.name
                },

                where: {
                    id: data.id
                }
            }
        );

        return user;
    }
}
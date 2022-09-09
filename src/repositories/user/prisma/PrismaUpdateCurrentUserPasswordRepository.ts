import { UpdateCurrentUserPasswordContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaUpdateCurrentUserPasswordRepository implements UpdateCurrentUserPasswordContract {
    async updateCurrentPassword(data: UpdateCurrentUserPasswordContract.Request) {
        const user = await prisma.user.update(
            {
                data: {
                    password: data.password
                },

                where: {
                    id: data.id
                }
            }
        );

        return user;
    }
}
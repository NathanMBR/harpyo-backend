import { UpdateCurrentUserEmailContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaUpdateCurrentUserEmailRepository implements UpdateCurrentUserEmailContract {
    async updateCurrentEmail(data: UpdateCurrentUserEmailContract.Request) {
        const user = await prisma.user.update(
            {
                data: {
                    email: data.email
                },

                where: {
                    id: data.id
                }
            }
        );

        return user;
    }
}
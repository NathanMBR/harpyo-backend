import { ReadOneUserByEmailContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaReadOneUserByEmailRepository implements ReadOneUserByEmailContract {
    async readOneByEmail(data: ReadOneUserByEmailContract.Request) {
        const { email } = data;

        const user = await prisma.user.findFirst(
            {
                where: {
                    email,
                    deletedAt: null
                }
            }
        );

        return user;
    }
}
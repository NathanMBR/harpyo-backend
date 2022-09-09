import { ReadOnePasswordResetByTokenContract } from "@/repositories/passwordReset";
import { prisma } from "@/database/prisma";

export class PrismaReadOnePasswordResetByTokenRepository implements ReadOnePasswordResetByTokenContract {
    async findOneByToken(data: ReadOnePasswordResetByTokenContract.Request) {
        const passwordReset = await prisma.passwordReset.findFirst(
            {
                where: {
                    token: data.token,
                    resetedAt: null,
                    deletedAt: null
                }
            }
        );

        return passwordReset;
    }
}
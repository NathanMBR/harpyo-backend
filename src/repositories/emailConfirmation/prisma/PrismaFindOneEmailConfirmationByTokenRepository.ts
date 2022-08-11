import { FindOneEmailConfirmationByTokenContract } from "@/repositories/emailConfirmation";
import { prisma } from "@/database/prisma";

export class PrismaFindOneEmailConfirmationByTokenRepository implements FindOneEmailConfirmationByTokenContract {
    async findOneByToken(data: FindOneEmailConfirmationByTokenContract.Request) {
        const emailConfirmation = await prisma.emailConfirmation.findFirst(
            {
                where: {
                    token: data.token,
                    confirmedAt: null,
                    deletedAt: null
                }
            }
        );

        return emailConfirmation;
    }
}
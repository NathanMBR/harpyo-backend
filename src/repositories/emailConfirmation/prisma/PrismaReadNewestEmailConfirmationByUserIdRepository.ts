import { ReadNewestEmailConfirmationByUserIdContract } from "@/repositories/emailConfirmation";
import { prisma } from "@/database/prisma";

export class PrismaReadNewestEmailConfirmationByUserIdRepository implements ReadNewestEmailConfirmationByUserIdContract {
    async readNewestByUserId(data: ReadNewestEmailConfirmationByUserIdContract.Request) {
        const {
            userId
        } = data;

        const emailConfirmation = await prisma.emailConfirmation.findFirst(
            {
                where: {
                    userId: userId,
                    deletedAt: null
                },

                orderBy: {
                    id: "desc"
                }
            }
        );

        return emailConfirmation;
    }
}
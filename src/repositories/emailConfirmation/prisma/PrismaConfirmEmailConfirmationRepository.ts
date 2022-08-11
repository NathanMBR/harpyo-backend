import { ConfirmEmailConfirmationContract } from "@/repositories/emailConfirmation";
import { prisma } from "@/database/prisma";

export class PrismaConfirmEmailConfirmationRepository implements ConfirmEmailConfirmationContract {
    async confirm(data: ConfirmEmailConfirmationContract.Request) {
        const emailConfirmation = await prisma.emailConfirmation.update(
            {
                where: {
                    id: data.id
                },

                data: {
                    confirmedAt: new Date()
                }
            }
        );

        return emailConfirmation;
    }
}
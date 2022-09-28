import { CreateEmailConfirmationContract } from "@/repositories/emailConfirmation";
import { prisma } from "@/database/prisma";

export class PrismaCreateEmailConfirmationRepository implements CreateEmailConfirmationContract {
    async create(data: CreateEmailConfirmationContract.Request) {
        const emailConfirmation = await prisma.emailConfirmation.create(
            {
                data: {
                    userId: data.userId,
                    email: data.email
                }
            }
        );

        return emailConfirmation;
    }
}
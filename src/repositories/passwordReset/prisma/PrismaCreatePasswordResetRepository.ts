import { CreatePasswordResetContract } from "@/repositories/passwordReset";
import { prisma } from "@/database/prisma";

export class PrismaCreatePasswordResetRepository implements CreatePasswordResetContract {
    async create(data: CreatePasswordResetContract.Request) {
        const passwordReset = await prisma.passwordReset.create(
            {
                data: {
                    user: {
                        connect: {
                            id: data.userId
                        }
                    },
                    resetedAt: data.resetedAt,
                    method: data.method
                }
            }
        );

        return passwordReset;
    }
}
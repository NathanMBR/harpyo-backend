import { UpdatePasswordResetContract } from "@/repositories/passwordReset";
import { prisma } from "@/database/prisma";

export class PrismaUpdatePasswordResetByTokenRepository implements UpdatePasswordResetContract {
    async update(data: UpdatePasswordResetContract.Request) {
        const passwordReset = await prisma.passwordReset.update(
            {
                where: {
                    id: data.id
                },

                data: {
                    resetedAt: data.resetedAt,
                    method: data.method
                }
            }
        );

        return passwordReset;
    }
}
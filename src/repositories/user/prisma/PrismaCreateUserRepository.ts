import { CreateUserContract } from "@/repositories/user";
import { prisma } from "@/database/prisma";

export class PrismaCreateUserRepository implements CreateUserContract {
    async create(data: CreateUserContract.Request) {
        const user = await prisma.user.create(
            {
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    emailConfirmations: {
                        create: {
                            email: data.email,
                            confirmedAt: null
                        }
                    }
                },

                include: {
                    emailConfirmations: true
                }
            }
        );

        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            confirmedAt: user.confirmedAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,

            emailConfirmation: user.emailConfirmations[0]
        };

        return response;
    }
}
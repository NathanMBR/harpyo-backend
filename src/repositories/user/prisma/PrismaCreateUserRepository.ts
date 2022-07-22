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
                }
            }
        );

        return user;
    }
}
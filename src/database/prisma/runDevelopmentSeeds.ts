import { prisma } from "./connection";
import { hash } from "bcryptjs";
import pino from "pino";

const logger = pino();

const runDevelopmentSeeds = async () => {
    const email = "john.doe@test.com";
    const password = await hash(
        "password",
        16
    );
    const confirmedAt = new Date();

    await prisma.user.upsert(
        {
            where: {
                id: 1
            },
            update: {},
            create: {
                name: "John Doe",
                email,
                password,
                confirmedAt,
                emailConfirmations: {
                    create: {
                        email,
                        confirmedAt
                    }
                }
            }
        }
    );
};

runDevelopmentSeeds()
    .then(
        () => {
            process.exitCode = 0;
        }
    )
    .catch(
        error => {
            logger.error(error);
            process.exitCode = 1;
        }
    )
    .finally(process.exit);
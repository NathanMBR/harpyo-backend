import { prisma } from "@/database/prisma";

export const healthCheckHelper = async () => {
    await prisma.$connect();
};
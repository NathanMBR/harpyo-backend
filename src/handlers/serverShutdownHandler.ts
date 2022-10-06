import { Server } from "http";
import pino from "pino";

import { prisma } from "@/database/prisma";

const logger = pino();

export const serverShutdownHandler = (server: Server) => (signal: NodeJS.Signals) => {
    logger.info(`Shutdown signal received: ${signal}`);
    logger.info("Shutting down server...");

    prisma.$disconnect()
        .catch(logger.error)
        .finally(
            () => server.close(
                () => logger.info("Server successfully shut down.")
            )
        );
};
import { Server } from "http";
import { prisma } from "@/database/prisma";

export const serverShutdownHandler = (server: Server) => (signal: NodeJS.Signals) => {
    console.log(`Shutdown signal received: ${signal}`);
    console.log("Shutting down server...");

    prisma.$disconnect()
        .catch(console.error)
        .finally(
            () => server.close(
                () => console.log("Server successfully shut down.")
            )
        );
};
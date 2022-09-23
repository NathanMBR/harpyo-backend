import { app } from "@/server";
import {
    PORT,
    NODE_ENV
} from "@/settings";
import { healthCheckHelper } from "@/helpers";
import {
    serverListeningHandler,
    serverShutdownHandler
} from "@/handlers";

const startServer = async () => {
    await healthCheckHelper();

    const server = app.listen(
        PORT,
        serverListeningHandler(PORT, NODE_ENV)
    );

    process.on(
        "exit",
        serverShutdownHandler(server)
    );

    process.on(
        "SIGINT",
        serverShutdownHandler(server)
    );

    process.on(
        "SIGTERM",
        serverShutdownHandler(server)
    );
};

startServer();
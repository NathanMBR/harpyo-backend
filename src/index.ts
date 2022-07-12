import { app } from "@/server";
import {
    PORT,
    NODE_ENV
} from "@/settings";
import { healthCheckHelper } from "@/helpers";
import { serverListeningHandler } from "@/handlers";

const startServer = async () => {
    await healthCheckHelper();

    app.listen(
        PORT,
        serverListeningHandler(PORT, NODE_ENV)
    );
};

startServer();
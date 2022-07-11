import { app } from "./server";
import {
    PORT,
    NODE_ENV
} from "@/settings";
import { serverListeningHandler } from "@/handlers";

app.listen(
    PORT,
    serverListeningHandler(PORT, NODE_ENV)
);
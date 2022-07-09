import { app } from "./server";
import {
    PORT,
    NODE_ENV
} from "@/settings";

/* eslint-disable no-console */
const handleListening = () => {
    console.log("Server online!");
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
};
/* eslint-enable no-console */

app.listen(
    PORT,
    handleListening
);
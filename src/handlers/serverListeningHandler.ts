import pino from "pino";

const logger = pino();

export const serverListeningHandler = (
    port: number,
    environment: string
) => () => {
    logger.info("Server online!");
    logger.info(`Port: ${port}`);
    logger.info(`Environment: ${environment}`);
};
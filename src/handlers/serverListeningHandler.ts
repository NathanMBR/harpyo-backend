/* eslint-disable no-console */
export const serverListeningHandler = (
    port: number,
    environment: string
) => () => {
    console.log("Server online!");
    console.log(`Port: ${port}`);
    console.log(`Environment: ${environment}`);
};
/* eslint-enable no-console */
import express from "express";
import cors from "cors";

import { routes } from "./routes";

const app = express();

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", routes);

export { app };
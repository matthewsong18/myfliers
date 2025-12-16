import express from "express";
import { siteRouter } from "./routes/sites/site.router.ts";
import { globalErrorHandler } from "./middleware/error.middleware.ts";

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/sites", siteRouter);

app.use(globalErrorHandler);

export { app };

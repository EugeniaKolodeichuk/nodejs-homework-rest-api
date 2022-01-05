import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import { httpCode } from "./lib/constants.js";

import contactsRouter from "./routes/api/contacts.js";
import authRouter from "./routes/api/auth.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(httpCode.NOT_FOUND).json({
    status: "error",
    code: httpCode.NOT_FOUND,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(httpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: httpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
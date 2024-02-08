import express from "express";
import sanitizedConfig from "./config/config";
import connnectMongo from "./utils/db";
import indexRouter from "./routes/index.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

connnectMongo();
const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use("/", indexRouter);

app.listen(sanitizedConfig.PORT || 3000, function () {
  console.log("server is listening");
});

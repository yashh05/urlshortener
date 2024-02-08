import express from "express";
import sanitizedConfig from "./config/config";
import connnectMongo from "./utils/db";
import indexRouter from "./routes/index.routes";

connnectMongo();
const app = express();
app.use(express.json());
app.use("/", indexRouter);

app.listen(sanitizedConfig.PORT || 3000, function () {
  console.log("server is listening");
});

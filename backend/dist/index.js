"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const db_1 = __importDefault(require("./utils/db"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", index_routes_1.default);
app.listen(config_1.default.PORT || 3000, function () {
    console.log("server is listening");
});

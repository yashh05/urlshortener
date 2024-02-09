"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_controller_1 = require("../controllers/url.controller");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const validation_1 = require("../middlewares/validation");
const url_schema_1 = require("../zodSchema/url.schema");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/addUrl", authentication_1.default, (0, validation_1.validate)(url_schema_1.AddUrlSchema), url_controller_1.addUrl);
router.get("/getUser", authentication_1.default, user_controller_1.getUser);
router.get("/logout", authentication_1.default, user_controller_1.handleLogout);
exports.default = router;

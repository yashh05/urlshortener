"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_1 = require("../middlewares/validation");
const auth_schema_1 = require("../zodSchema/auth.schema");
const router = express_1.default.Router();
router.post("/signup", (0, validation_1.validate)(auth_schema_1.signupSchema), auth_controller_1.handleSignup);
router.post("/signin", (0, validation_1.validate)(auth_schema_1.signinSchema), auth_controller_1.handleSignin);
exports.default = router;

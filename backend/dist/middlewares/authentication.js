"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessages_1 = __importDefault(require("../config/errorMessages"));
const config_1 = __importDefault(require("../config/config"));
const extractToken = (req) => {
    const token = req.cookies.authorization;
    return (token === null || token === void 0 ? void 0 : token.startsWith("Bearer")) ? token.split(" ")[1] : undefined;
};
const authenticationMiddleware = (req, res, next) => {
    try {
        const token = extractToken(req);
        if (!token) {
            throw new Error(errorMessages_1.default.UNAUTHORIZED_USER);
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (!decodedToken.userId) {
            throw new Error(errorMessages_1.default.UNAUTHORIZED_USER);
        }
        res.locals.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        console.error(err);
        return res
            .status(401)
            .json({ status: "fail", error: errorMessages_1.default.UNAUTHORIZED_USER });
    }
};
exports.default = authenticationMiddleware;

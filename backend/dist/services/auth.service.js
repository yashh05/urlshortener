"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const errorMessages_1 = __importDefault(require("../config/errorMessages"));
const createToken = (credential) => {
    try {
        const signature = jsonwebtoken_1.default.sign(credential, config_1.default.JWT_SECRET);
        return "Bearer " + signature;
    }
    catch (error) {
        console.error(error.message);
        throw errorMessages_1.default.JWT_SIGNING_ERROR;
    }
};
exports.createToken = createToken;

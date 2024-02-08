"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignin = exports.handleSignup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const errorMessages_1 = __importDefault(require("../config/errorMessages"));
const bcrypt_1 = require("bcrypt");
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUSer = yield (0, user_service_1.findUserByEmail)(email);
        if (existingUSer) {
            throw new Error(errorMessages_1.default.USER_ALREADY_EXISTS);
        }
        const newUser = yield userModel_1.default.create({
            name,
            email,
            password,
        });
        const jwtToken = (0, auth_service_1.createToken)({ userId: newUser._id });
        res.cookie("authorization", jwtToken, { httpOnly: true });
        res.status(201).json({ status: "success", message: "New user created" });
    }
    catch (e) {
        res.status(500).json({ status: "fail", error: e.message });
    }
});
exports.handleSignup = handleSignup;
const handleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUSer = yield (0, user_service_1.findUserByEmail)(email);
        if (!existingUSer) {
            throw new Error(errorMessages_1.default.WRONG_CREDENTIALS);
        }
        const isValidPassword = yield (0, bcrypt_1.compare)(password, existingUSer.password);
        if (!isValidPassword) {
            throw new Error(errorMessages_1.default.WRONG_CREDENTIALS);
        }
        const jwtToken = (0, auth_service_1.createToken)({ userId: existingUSer._id });
        res.cookie("authorization", jwtToken, { httpOnly: true });
        res.status(200).json({ status: "success", message: "User signed in" });
    }
    catch (e) {
        res.status(500).json({ status: "fail", error: e.message });
    }
});
exports.handleSignin = handleSignin;

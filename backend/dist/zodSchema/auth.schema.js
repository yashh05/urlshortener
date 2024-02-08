"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const signupSchema = zod_1.default.object({
    name: zod_1.default.string({ required_error: "Enter Name" }),
    email: zod_1.default
        .string({ required_error: "Enter Email" })
        .email("Enter Valid Email"),
    password: zod_1.default
        .string({ required_error: "Enter Password" })
        .min(6, "too short password"),
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.default.object({
    email: zod_1.default
        .string({ required_error: "Enter Email" })
        .email("Enter Valid Email"),
    password: zod_1.default
        .string({ required_error: "Enter Password" })
        .min(6, "too short password"),
});
exports.signinSchema = signinSchema;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUrlSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const AddUrlSchema = zod_1.default.object({
    url: zod_1.default.string({ required_error: "Enter Url" }).url(),
});
exports.AddUrlSchema = AddUrlSchema;

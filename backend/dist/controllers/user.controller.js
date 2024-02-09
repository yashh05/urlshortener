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
exports.handleLogout = exports.getUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = res.locals;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "fail", error: "user not found" });
        }
        else {
            const responseUser = {
                name: user.name,
                email: user.email,
            };
            res.status(200).json({ status: "success", responseUser });
        }
    });
}
exports.getUser = getUser;
const handleLogout = (req, res) => {
    const { userId } = res.locals;
    res.cookie("authorization", "");
    res
        .status(200)
        .json({ status: "success", message: "User logout successfully" });
};
exports.handleLogout = handleLogout;

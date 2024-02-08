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
exports.getShortenedUrl = exports.getUrlByShortenedUrl = exports.getUrl = exports.getUrlByUserId = void 0;
const urlModel_1 = __importDefault(require("../models/urlModel"));
const nanoid_1 = require("nanoid");
function getUrlByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield urlModel_1.default.find({
            userId,
        });
    });
}
exports.getUrlByUserId = getUrlByUserId;
function getUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield urlModel_1.default.findOne({
            url,
        });
    });
}
exports.getUrl = getUrl;
function getUrlByShortenedUrl(shortendUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield urlModel_1.default.findOne({
            shortendUrl,
        });
    });
}
exports.getUrlByShortenedUrl = getUrlByShortenedUrl;
function getShortenedUrl(url, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const shortendUrl = (0, nanoid_1.nanoid)(7);
        const checkExisting = yield getUrlByShortenedUrl(shortendUrl);
        if (!checkExisting) {
            return yield urlModel_1.default.create({
                url,
                shortendUrl,
                userId,
            });
        }
        else {
            yield getShortenedUrl(url, userId);
        }
    });
}
exports.getShortenedUrl = getShortenedUrl;

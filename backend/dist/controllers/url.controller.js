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
exports.addUrl = exports.redirectUrl = exports.getAllUrl = void 0;
const url_service_1 = require("../services/url.service");
const errorMessages_1 = __importDefault(require("../config/errorMessages"));
function getAllUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = res.locals;
            const allUrl = yield (0, url_service_1.getUrlByUserId)(userId);
            if (!allUrl) {
                return res.status(404).json({ status: "fail", message: "No URl" });
            }
            else {
                return res.status(200).json({ status: "success", urls: allUrl });
            }
        }
        catch (e) {
            console.log(e.message);
            res
                .status(500)
                .json({ status: "fail", message: errorMessages_1.default.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getAllUrl = getAllUrl;
function redirectUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { shortenedUrl } = req.params;
            const urlDoc = yield (0, url_service_1.getUrlByShortenedUrl)(shortenedUrl);
            if (!urlDoc) {
                return res.status(404).json({ status: "fail", message: "wrong Url" });
            }
            yield urlDoc.increaseClicks();
            res.redirect(urlDoc.url);
        }
        catch (e) {
            console.log(e.message);
            res
                .status(500)
                .json({ status: "fail", message: errorMessages_1.default.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.redirectUrl = redirectUrl;
function addUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = res.locals;
            const { url } = req.body;
            const checkExisting = yield (0, url_service_1.getUrl)(url);
            if (checkExisting) {
                return res
                    .status(404)
                    .json({ status: "fail", message: "Url already exists" });
            }
            yield (0, url_service_1.getShortenedUrl)(url, userId);
            res.status(200).json({ status: "success", message: "new url created" });
        }
        catch (e) {
            console.log(e.message);
            res
                .status(500)
                .json({ status: "fail", message: errorMessages_1.default.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addUrl = addUrl;

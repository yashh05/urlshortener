"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlSchema = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const userModel_1 = require("./userModel");
class UrlSchema {
    increaseClicks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clicks = this.clicks + 1;
            yield this.save();
        });
    }
}
exports.UrlSchema = UrlSchema;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], UrlSchema.prototype, "url", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], UrlSchema.prototype, "shortendUrl", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => userModel_1.UserSchema }),
    __metadata("design:type", Object)
], UrlSchema.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], UrlSchema.prototype, "clicks", void 0);
const Url = (0, typegoose_1.getModelForClass)(UrlSchema);
exports.default = Url;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                status: "fail",
                error: error.errors,
            });
        }
        else {
            res.status(400).json({ status: "fail", error: error.message });
        }
    }
};
exports.validate = validate;

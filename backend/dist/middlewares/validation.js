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
            const pathError = error.errors.map((singleError) => {
                console.log(singleError.path[0], singleError.message);
                const path = singleError.path[0].toString();
                const newError = {
                    path,
                    patherror: singleError.message,
                };
                return newError;
            });
            return res.status(400).json({
                status: "fail",
                type: "ZodError",
                error: pathError,
            });
        }
        else {
            res.status(400).json({ status: "fail", error: error.message });
        }
    }
};
exports.validate = validate;

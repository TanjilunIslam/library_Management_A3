"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const errorHandling = (error) => {
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        return {
            message: 'Validation failed',
            success: false,
            error
        };
    }
    return {
        message: error.message || 'Something went wrong',
        success: false,
        error
    };
};
exports.errorHandling = errorHandling;

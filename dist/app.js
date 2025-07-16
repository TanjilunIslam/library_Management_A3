"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const errorHandling_1 = require("./app/utils/errorHandling");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowBookRoutes);
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the  Library Management"
    });
});
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        success: false,
        error: `Cannot get ${req.url}`
    });
});
app.use((error, req, res, next) => {
    res.status(400).json((0, errorHandling_1.errorHandling)(error));
});
exports.default = app;

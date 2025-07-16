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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.bookRoutes = express_1.default.Router();
// post books ->
exports.bookRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield books_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });
    }
    catch (error) {
        next(error);
    }
}));
// get all books(sorting)->
exports.bookRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const resultsLimit = limit ? Number(limit) : 10;
        let booksQuery = yield books_model_1.Book.find(query).sort({ [sortBy]: sort === 'desc' ? 'desc' : 'asc' }).limit(resultsLimit);
        // let booksQuery = await Book.find(query).sort({ [sortBy as string]: `${sort}` }).limit(resultsLimit)
        // if (sortBy) {
        //     const sortDirection = sort === 'desc' ? 'descending' : 'ascending';
        //     booksQuery = booksQuery.sort({ [sortBy as string]: sort });
        // }
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: booksQuery
        });
    }
    catch (error) {
        next(error);
    }
}));
// get book by id->
exports.bookRoutes.get('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findById(req.params.bookId);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
}));
// update book -> 
exports.bookRoutes.patch('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const bookBody = req.body;
        const updateBook = yield books_model_1.Book.findByIdAndUpdate(bookId, bookBody, { new: true });
        if (!updateBook)
            throw new Error('Book not found');
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook
        });
    }
    catch (error) {
        next(error);
    }
}));
// delete book ->
exports.bookRoutes.delete('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deleteBook = yield books_model_1.Book.findOneAndDelete({ _id: bookId });
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        next(error);
    }
}));

import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/books.model';


export const bookRoutes = express.Router();


// post books ->
bookRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBook = await Book.create(req.body)
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        })
    } catch (error: any) {
        next(error)
    }
})

// get all books(sorting)->
bookRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query: any = {};
        if (filter) {
            query.genre = filter;
        }

        const resultsLimit = limit ? Number(limit) : 10;

        let booksQuery = await Book.find(query).sort({ [sortBy as string]: sort === 'desc' ? 'desc' : 'asc' }).limit(resultsLimit);

        
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: booksQuery
        })
    } catch (error: any) {
        next(error)
    }
})



// get book by id->

bookRoutes.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findById(req.params.bookId);

        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        })
    } catch (error: any) {
        next(error)
    }
})


// update book -> 

bookRoutes.patch('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        const bookBody = req.body;
        const updateBook = await Book.findByIdAndUpdate(bookId, bookBody, { new: true })
        if (!updateBook) throw new Error('Book not found');

        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook
        })
    } catch (error: any) {
        next(error)
    }
})


// delete book ->


bookRoutes.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const deleteBook = await Book.findOneAndDelete({ _id: bookId })
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error: any) {
        next(error)
    }
})
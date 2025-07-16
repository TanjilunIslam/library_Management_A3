import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/books.model';
import { Borrow } from '../models/borrow.model';

export const borrowBookRoutes = express.Router();



borrowBookRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        await Book.borrowBookAvailability(bookId, quantity);

        const borrowRecords = await Borrow.create({
            book: bookId,
            quantity,
            dueDate
        })
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecords
        })
    } catch (error: any) {
        next(error)
    }
})


borrowBookRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataSummary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            {
                $unwind: '$bookDetails'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: dataSummary
        })
    } catch (error: any) {
        next(error)
    }
})
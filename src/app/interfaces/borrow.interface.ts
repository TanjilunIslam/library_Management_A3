import { Types } from "mongoose";

export interface IBorrow {
    book: Types.ObjectId | string;
    quantity: number;
    dueDate: Date
}
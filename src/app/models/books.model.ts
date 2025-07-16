import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook, BookStaticMethods>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, max: 350 },
    copies: { type: Number, required: true, min: [0, "Copies must be a positive number"] },
    available: { type: Boolean, default: true },
},
    {
        versionKey: false,
        timestamps: true
    }
)

bookSchema.static('borrowBookAvailability', async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId)
    if (!book) {
        throw new Error('Book not found');
    }
    if (book.copies < quantity) {
        throw new Error('Not enough copies available');
    }
    book.copies = book.copies - quantity;

    if (book.copies === 0) {
        book.available = false
    }
    await book.save();
})

// pre/post middleware

bookSchema.pre('save', function (next) {
    console.log(`📘 Book about to be saved: ${this.title}`);
    next()
})

bookSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        console.log(`🗑 Book deleted: ${doc.title}`);
        await import('./borrow.model').then(({ Borrow }) => {
            Borrow.deleteMany({ book: doc._id }).then(() =>
                console.log('🧹 Related borrow records deleted')
            );
        });
    }
});

export const Book = model<IBook, BookStaticMethods>('Book', bookSchema)
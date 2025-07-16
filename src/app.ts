import express, { Application, NextFunction, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/books.controller';
import { borrowBookRoutes } from './app/controllers/borrow.controller';
import { errorHandling } from './app/utils/errorHandling';

const app: Application = express();

app.use(express.json())
app.use("/api/books", bookRoutes)
app.use("/api/borrow", borrowBookRoutes)


app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: "Route not found",
        success: false,
        error: `Cannot get ${req.url}`
    });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json(errorHandling(error));
});


app.get('/', (req: Request, res: Response) => {
    res.send('welcome to library management server')
})

export default app;
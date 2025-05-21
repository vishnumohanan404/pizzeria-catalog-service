import { NextFunction, Request, Response } from "express";

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // your logic here

            res.status(201).json({
                message: "Category created",
            });
        } catch (error) {
            next(error); // forward to error middleware
        }
    }
}

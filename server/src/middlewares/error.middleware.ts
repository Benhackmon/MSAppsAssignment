import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({ message: error?.response?.data || error.message });
};
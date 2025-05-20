import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { BadRequestError } from '../core/apiError';

const signupUser = z.object({
    fullName: z.string().min(1,"name can't be empty"),
    email: z.string().email('email is required'),
    password: z.string().min(6)
})

const loginUser = z.object({
    email: z.string().email("email is required"),
    password: z.string().min(6)
})

export const validateSignupUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = signupUser.safeParse(req.body);
        if (!result.success) {
            throw new BadRequestError(result.error.errors[0].message);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = loginUser.safeParse(req.body);
        if (!result.success) {
            throw new BadRequestError(result.error.errors[0].message);
        }
        next();
    } catch (error) {
        next(error);
    }
};
import express from 'express';
import * as middlewares from './middlewares/index';
import * as controllers from './controllers/index';
import asyncHandler from 'express-async-handler';

export const rootRouter = express.Router();

rootRouter.post('/auth/login',middlewares.validateLoginUser,asyncHandler(controllers.authController));
rootRouter.post('/auth/signup',middlewares.validateSignupUser,asyncHandler(controllers.createUser));
rootRouter.post('/auth/logout',asyncHandler(controllers.logOut));
rootRouter.put('/user/update-profile',middlewares.validateLoginUser,asyncHandler(controllers.updateUser));

// rootRouter.get('/auth/check',)
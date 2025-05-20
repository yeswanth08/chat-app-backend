import { Request, Response } from "express";
import { BadRequestError, InternalError } from "../core/apiError";
import prisma_client from "../config/prisma";
import { SuccessResponse } from "../core/apiResponse";
import cloudinary from "../config/cloudinary";
import { createUserUtil,updateUtil } from "../core/prismaFunctions";

interface customRequest extends Request {
  user?: {
    id: string;
  };
}


export const createUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await createUserUtil(prisma_client.users, {
            fullName,
            email,
            password
        });
        if (!user) throw new BadRequestError("User already exists");
        new SuccessResponse("User created successfully", user);
    } catch (error) {
        console.error(error);
        new InternalError("An error occurred");
    }
};

export const updateUser = async (req:customRequest, res: Response) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user?.id;
        if (!profilePic) new BadRequestError("profile pic is required");
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await updateUtil(
            prisma_client.users,
            { id: userId },
            { profilePic: uploadResponse.secure_url }
        );
        if (!updatedUser) throw new BadRequestError("User not found");
        new SuccessResponse("User updated", updatedUser);
    } catch (error) {
        console.error(error);
        new InternalError("An error occurred");
    }
};
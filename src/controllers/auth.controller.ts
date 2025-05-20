import { Request, Response } from "express";
import { InternalError, UnauthorizedError } from "../core/apiError";
import {findFirstUtil } from "../core/prismaFunctions";
import prisma_client from "../config/prisma";
import { SuccessResponse } from "../core/apiResponse";
import { generateToken } from "../config/utils";


export const authController  = async(req:Request,res:Response)=>{
    try{
        const {fullName,email,password} = req.body;
        const user = await findFirstUtil(prisma_client.users,{
            fullName,
            email,
            password
        });
        if (!user) new UnauthorizedError("un authorized acess");
        generateToken(user._id,res);
        new SuccessResponse("Validuser",user).send(res);
    }catch(error){
        new UnauthorizedError("un authorized Access");
    }
}


export const checkAuth = async(req:Request,res:Response)=>{
    try{    
        new SuccessResponse("success",req).send(res);
    }catch(error){
        new InternalError("Internal server error");
    }
}

export const logOut = async(req:Request,res:Response)=>{
    try{
        res.cookie("jwt","",{maxAge: 0});
        new SuccessResponse("success",req).send(res);
    }catch(error){
        new InternalError("Internal server error");
    }
}
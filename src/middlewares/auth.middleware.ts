import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";


dotenv.config();


const API_KEY = process.env.API_KEY;

export const authenticateAPI = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("Authorization");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return; 
  }

  next(); 
};

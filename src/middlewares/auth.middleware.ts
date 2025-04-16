import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Access the API_KEY from .env
const API_KEY = process.env.API_KEY;

export const authenticateAPI = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("Authorization");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return; // Ends the middleware execution, satisfies void return
  }

  next(); // Proceed if authenticated
};

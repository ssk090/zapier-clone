import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as unknown as string;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "You are not logged in!",
    });
  }
}
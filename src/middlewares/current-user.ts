import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Current user");
  if (!req.session?.jwt) {
    console.log("Current user no jwt");

    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log("Current user error", err);
  }
  next();
};

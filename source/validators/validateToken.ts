import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.params.token || req.headers["x-access-token"];

  if (!token)
    return res.status(401).json({ message: "token is missing", status: false });

  jwt.verify(token, "JwtSecret", (err: any, decode: any) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.cookies = decode;
    next();
  });
};

export default VerifyJWT;

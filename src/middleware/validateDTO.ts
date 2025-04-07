import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateDto = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map(d => d.message),
      });
    }
    next();
  };
};
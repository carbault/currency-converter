import { NextFunction, Request, Response } from "express";
import { z, ZodError, ZodIssue } from "zod";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "./errorCodes";

export function validateRequestBody(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.accepts("application/json");
      console.log("body", req.body);
      schema.parse(req.body);
      console.log("parsed with success");
      next();
    } catch (error) {
      handleSchemaError(res, error);
    }
  };
}

export function validateRequestParams(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.accepts("application/json");
      schema.parse(req.params);
      next();
    } catch (error) {
      handleSchemaError(res, error);
    }
  };
}

function handleSchemaError(res: Response, error: unknown) {
  if (error instanceof ZodError) {
    res.status(BAD_REQUEST).json({
      error: "Invalid request body",
      details: error.errors.map((issue: ZodIssue) => issue.message),
    });
  } else {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
}

import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  request,
  response,
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
    return;
  }

  console.log(error)
  
  response.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
  return; 
};
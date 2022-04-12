import { AppError } from '@errors/app.error';
import { response } from 'express';

export const httpError = (error: AppError) => {
  return response.status(error.statusCode).json({ error });
};

export const httpCreated = (body: unknown) => {
  return response.status(201).json(body);
};

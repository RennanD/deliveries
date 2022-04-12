import { NextFunction, Request, Response } from 'express';

import { AppError } from '@errors/app.error';

export async function handleException(
  error: AppError | Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction,
): Promise<Response> {
  // if (error instanceof AppError) {
  //   return response
  //     .status(error.statusCode)
  //     .json({ error: { message: error.message, type_error: error.type } });
  // }

  return response.status(500).json({
    error: `Internal server error - ${error.message}`,
    type_error: 'server_error',
  });
}

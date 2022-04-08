import { CreateDeliveryamUseCase } from '@application/useCases/deliveryman/create-deliveryman.usecase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, password } = request.body;

    const createDeliveryman = container.resolve(CreateDeliveryamUseCase);

    try {
      const deliveryman = await createDeliveryman.run({
        name,
        password,
        username,
      });

      return response.status(201).json({ deliveryman });
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error.message,
          type_error: 'bad_request',
        },
      });
    }
  }
}

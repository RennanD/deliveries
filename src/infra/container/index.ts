import { IHashProvider } from '@application/providers/ihash.provider';
import { IJWTProvider } from '@application/providers/ijwt.provider';
import { ICustomersRepository } from '@domain/customers/repositories/icustomers.repository';
import { IDeliverymanRepository } from '@domain/deliveryman/repositories/ideliveryman.repository';
import { BcryptHashAdapter } from '@infra/adapters/bcrypt-hash.adapter';
import { JsonWebTokenAdapter } from '@infra/adapters/jsonwebtoken-jwt.adapter';
import { PrismaCustomerRepository } from '@infra/database/prisma/repositories/customers/prisma-customer.repository';
import { PrismaDeliverymanRespository } from '@infra/database/prisma/repositories/deliveryman/prisma-devliveryman.repository';
import { container } from 'tsyringe';

// Repos
container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  PrismaCustomerRepository,
);

container.registerSingleton<IDeliverymanRepository>(
  'DeliverymanRepository',
  PrismaDeliverymanRespository,
);

// Providers
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashAdapter);
container.registerSingleton<IJWTProvider>('JWTProvider', JsonWebTokenAdapter);

import { IHashProvider } from '@application/providers/ihash.provider';
import { ICustomersRepository } from '@domain/customers/repositories/icustomers.repository';
import { BcryptHashAdapter } from '@infra/adapters/bcrypt-hash.adapter';
import { PrismaCustomerRepository } from '@infra/database/prisma/repositories/customers/prisma-customer.repository';
import { container } from 'tsyringe';

// Repos
container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  PrismaCustomerRepository,
);

// Providers
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashAdapter);

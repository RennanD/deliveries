import { Customer } from '@domain/customers/entities/customer';

import { BadRequestError } from '@errors/bad-request.error';

import { InMemoryCustomersRepository } from '@infra/database/in-memory/repositories/customers/in-memory-customers.repository';

import { CreateCustomerUseCase } from './create-customer.usecase';

const makeSut = () => {
  const customersRepository = new InMemoryCustomersRepository();
  const sut = new CreateCustomerUseCase(customersRepository);

  return { sut, customersRepository };
};

describe('Create Customer', () => {
  it('shoul not be able to create customers with same username', async () => {
    expect(async () => {
      const { sut, customersRepository } = makeSut();

      const customerData = {
        name: 'any-customer',
        username: 'any-customer',
        password: 'any-password',
      };

      const customer = await Customer.create(customerData);

      await customersRepository.createCustomer(customer);

      await sut.run(customerData);
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should be able to create a new customer', async () => {
    const { sut } = makeSut();

    const customerData = {
      name: 'any-customer',
      username: 'any-customer',
      password: 'any-password',
    };

    const customer = await sut.run(customerData);

    expect(customer).toHaveProperty('id');
    expect(customer.name).toEqual(customerData.name);
  });
});

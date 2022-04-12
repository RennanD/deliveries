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
    const { sut, customersRepository } = makeSut();

    const customerData = {
      name: 'any-customer',
      username: 'any-customer',
      password: 'any-password',
    };

    const customer = await Customer.create(customerData);

    await customersRepository.createCustomer(customer);

    const response = await sut.run(customerData);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(
      new BadRequestError('Customer already exists'),
    );
  });

  it('should be able to create a new customer', async () => {
    const { sut, customersRepository } = makeSut();

    const customerData = {
      name: 'any-customer',
      username: 'any-customer',
      password: 'any-password',
    };

    const response = await sut.run(customerData);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toHaveProperty('id');
    expect(
      await customersRepository.findCustomerByUsername(customerData.username),
    ).toBeTruthy();
  });
});

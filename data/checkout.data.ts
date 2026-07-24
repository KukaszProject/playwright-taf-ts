import { faker } from '@faker-js/faker';

export const CHECKOUT_DATA = {
    validCustomer: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode()
    },
    invalidCustomer: {
        firstName: '',
        lastName: '',
        postalCode: ''
    }
};
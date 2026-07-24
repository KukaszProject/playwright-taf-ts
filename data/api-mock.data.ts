import { faker } from '@faker-js/faker';

export const MOCK_API_DATA = {
  userResponse: {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  usersListResponse: Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  })),
};

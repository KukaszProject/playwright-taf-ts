import {faker} from '@faker-js/faker';

export class ApiPayloads {
    static createNewPost() {
        return {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            userId: faker.number.int({ min: 1, max: 10 })
        };
    }
}
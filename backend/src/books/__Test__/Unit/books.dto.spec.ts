import { validate } from 'class-validator';
import { CreateBookDto } from '../../dto/create-book.dto';
import { faker } from '@faker-js/faker';

describe('CreateBookDto', () => {
    it('should pass validation with valid data', async () => {
        const bookData = {
            name: faker.internet.userName(),
            quantity: faker.number.int(),
            image: faker.image.url(),
            description: faker.lorem.text(),
            category_id: 1,
            author_id: 1,
        };

        const dto = new CreateBookDto();
        Object.assign(dto, bookData);

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation if name length is less than 3 characters', async () => {
        const bookData = {
            name: 'Bo',
            quantity: 10,
            image: faker.number.int(),
            description: faker.lorem.text(),
            category_id: 1,
            author_id: 1,
        };

        const dto = new CreateBookDto();
        Object.assign(dto, bookData);

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation if quantity is not provided', async () => {
        const bookData = {
            name: faker.internet.userName(),
            quantity: faker.number.int(),
            image: faker.image.url(),
            description: faker.lorem.text(),
            category_id: 1,
            author_id: 1,
        };

        const dto = new CreateBookDto();
        Object.assign(dto, bookData);

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

});
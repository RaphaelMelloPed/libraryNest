import { faker } from '@faker-js/faker';
import { CreateAuthorDto } from '../../dto/create-author.dto';
import { validate } from 'class-validator';

describe('DTO validation', () => {
    it('should pass validation with a valid name', async () => {
        const createAuthorDto = new CreateAuthorDto();
        createAuthorDto.name = faker.internet.userName();

        const errors = await validate(createAuthorDto);

        expect(errors.length).toEqual(0);
    });

    it('should fail validation with an empty name', async () => {
        const createAuthorDto = new CreateAuthorDto();
        createAuthorDto.name = '';

        const errors = await validate(createAuthorDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
})
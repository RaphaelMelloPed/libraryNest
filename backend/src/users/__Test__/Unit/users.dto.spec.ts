import { validate } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { faker } from "@faker-js/faker"

describe("dto validate", () => {
    it('Should create a validate user', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = faker.internet.email()
        createUserDto.name = faker.internet.userName();
        createUserDto.password = 'teste123';
        createUserDto.image = faker.image.url()

        const errors = await validate(createUserDto);
        expect(errors.length).toEqual(0)
    })

    it('Should fail validation with an invalid email', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = 'invalid-email';

        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isEmail');
    });

    it('Should fail validation with an invalid name', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.name = '';

        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('Should fail validation with an invalid password', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.password = ''
        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    })
    it('Should fail validation with a password that do not have all the validation asked', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.password = '123';

        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);

        expect(errors[2].constraints).toHaveProperty('isStrongPassword');
    });
})
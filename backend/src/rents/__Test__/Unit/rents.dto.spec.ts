import { faker } from "@faker-js/faker"
import { CreateRentDto } from "../../dto/create-rent.dto"
import { validate } from "class-validator"

describe('Validation DTO', () => {
    it('Create the rent', async () => {
        const rentData = {
            pick_up_date: faker.date.recent(),
            returns_date: faker.date.soon(),
            user_id: 1,
            book_id: 1
        }
        const errors = await validate(rentData);

        expect(errors.length).toEqual(0);
    })

    it('should fail validation with an empty pick up date and return date', async () => {
        const CreateRent = new CreateRentDto();
        CreateRent.pick_up_date = null
        CreateRent.returns_date = null

        const errors = await validate(CreateRent);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
})
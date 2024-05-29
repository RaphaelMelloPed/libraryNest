import { validate } from "class-validator";
import { CreateCategoryDto } from "../../dto/create-category.dto";

describe('DTO validation', () => {
    it('should pass validation with a valid name', async () => {
        const createCategoryDto = new CreateCategoryDto();
        createCategoryDto.name = 'Terror';

        const errors = await validate(createCategoryDto);

        expect(errors.length).toEqual(0);
    });

    it('should fail validation with an empty name', async () => {
        const createCategoryDTO = new CreateCategoryDto();
        createCategoryDTO.name = '';

        const errors = await validate(createCategoryDTO);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
})
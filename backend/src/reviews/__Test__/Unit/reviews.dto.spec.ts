// import { faker } from "@faker-js/faker"
// import { validate } from "class-validator";
// import { CreateReviewDto } from "../../dto/create-review.dto";

// describe('DTO validation', () => {
//     it('Create review', async () => {
//         const reviewData = {
//             rating: 5,
//             comment: faker.lorem.text(),
//             user_id: 1,
//             book_id: 1
//         }

//         const errors = await validate(reviewData);

//         expect(errors.length).toEqual(0);
//     })

//     it('should fail validation with an empty rating', async () => {
//         const createReviewDto = new CreateReviewDto();
//         createReviewDto.book_id = 1,
//             createReviewDto.user_id = 1,
//             createReviewDto.rating = null

//         const errors = await validate(createReviewDto);

//         expect(errors.length).toBeGreaterThan(0);
//         expect(errors[0].constraints).toHaveProperty('isNotEmpty');
//     });
// })
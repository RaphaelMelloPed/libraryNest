import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "../../auth.service"
import { AuthLoginDTO } from "../../dto/login_auth.dto"
import { faker } from "@faker-js/faker"
import { UsersService } from "../../../users/users.service"
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

const mockAuthRepository = {
    findOne: jest.fn()
}

const mockUserRepository = {
    findOne: jest.fn(),
}

const mockTokenRepository = {
    createToken: jest.fn(),

}

describe('AuthService', () => {
    let authService: AuthService
    let userService: UsersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersService,
                JwtService,
                { provide: 'AuthEntityRepository', useValue: mockAuthRepository },
                { provide: 'UserEntityRepository', useValue: mockUserRepository }
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService)
        userService = module.get<UsersService>(UsersService)
    })


    describe('login', () => {
        it('Should find the email and create the token with bcrypt in password', async () => {
            const data: AuthLoginDTO = {
                email: faker.internet.email(),
                password: '123'
            }

            const user = { id: 1, email: data.email, password: await bcrypt.hash(data.password, 10) };
            mockUserRepository.findOne.mockResolvedValueOnce(user);

            const result = await authService.login(data.password, data.email);

            expect(result.accessToken).toBeDefined();
            expect(result.user).toEqual(user);
        });

        it('Should throw UnauthorizedException when email does not exist', async () => {
            const data: AuthLoginDTO = {
                email: faker.internet.email(),
                password: '123'
            }

            mockUserRepository.findOne.mockResolvedValueOnce(undefined);

            await expect(authService.login(data.password, data.email)).rejects.toThrow(UnauthorizedException);
        });

        it('Should throw UnauthorizedException when password is incorrect', async () => {
            const data: AuthLoginDTO = {
                email: faker.internet.email(),
                password: '123'
            }

            const user = { id: 1, email: data.email, password: await bcrypt.hash('wrongpassword', 10) };
            mockUserRepository.findOne.mockResolvedValueOnce(user);

            await expect(authService.login(data.password, data.email)).rejects.toThrow(UnauthorizedException);
        });
    });
});
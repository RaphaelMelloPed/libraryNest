import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../../../auth/auth.service';
import { AuthLoginDTO } from '../input/login_auth.dto';
import { AuthPayload } from '../args/auth.payload';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthPayload)
    async login(@Args('input') input: AuthLoginDTO) {
        const { email, password } = input;
        const result = await this.authService.login(email, password);
        return result;
    }
}
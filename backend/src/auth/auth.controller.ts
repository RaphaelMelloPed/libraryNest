import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/login_auth.dto";
import { AuthService } from "./auth.service"; 
import { AuthGuard } from "../guards/auth.guards";

@Controller('auth')
export class authController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() {password, email}: AuthLoginDTO) {
        return this.authService.login(password,email);

    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(){
        return {me:"ok"}
    }

}
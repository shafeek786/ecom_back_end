import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/DTO/login.dto';
import { UserDto } from 'src/DTO/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login.
   * @param user Contains email and password.
   * @returns Authentication token or error message.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    user: LoginDto,
  ) {
    const result = await this.authService.validateUser(
      user.email,
      user.password,
      user.userType,
    );
    if (result) {
      return this.authService.login(result, user.userType);
    }
    return { message: 'Invalid credentials' };
  }

  @Post('signup')
  async signup(
    @Body() data: UserDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.authService.signup(data);
  }
}

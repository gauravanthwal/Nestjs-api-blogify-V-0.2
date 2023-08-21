import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/auth/authguard/authguard.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() userData: CreateUserDto) {
    return this.userService.register(userData);
  }

  @Post('/login')
  async login(@Body() userData: LoginDto) {
    return this.userService.login(userData);
  }

  @Get('/all')
  // @UseGuards(AuthGuard)
  async getAll() {
    return this.userService.getUser();
  }

  @Delete('/remove')
  async deleteAll() {
    return this.userService.deleteUser();
  }
}

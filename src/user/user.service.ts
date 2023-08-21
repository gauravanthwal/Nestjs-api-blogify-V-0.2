import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async register(userData: CreateUserDto) {
    try {
      const { password } = userData;
      const hashedPass = await this.authService.hashUserPassword(password);

      const user = await this.userModel.create({
        ...userData,
        password: hashedPass,
      });
      return user;
    } catch (err) {
      return { error: err.message };
    }
  }

  async login(userData: LoginDto) {
    const { email, password } = userData;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Couldnt find user, please register first');
    }
    const isPasswordCorrect = await this.authService.validateUserPassword(
      user.password,
      userData.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }

    const tokenPayload = { id: user._id, email: user.email };
    const token = await this.authService.generateJwtToken(tokenPayload);

    return { token: token };
  }

  async getUser() {
    const users = await this.userModel.find();
    return users;
  }

  async deleteUser() {
    const users = await this.userModel.deleteMany();
    return users;
  }
}

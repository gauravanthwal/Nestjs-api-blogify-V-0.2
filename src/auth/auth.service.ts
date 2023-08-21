import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { createHmac } from 'crypto';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(REQUEST) private request: Request, // private userService: UserService,
  ) {}

  // CREAET HASH FROM PASSWORD
  async hashUserPassword(password: string) {
    const SALT = process.env.CRYPTO_SALT;
    const hashedPass = await createHmac('sha256', SALT)
      .update(password)
      .digest('hex');
    return hashedPass;
  }

  // VALIDATE PASSWORD CORRECT OR NOT
  async validateUserPassword(passwordHash: string, userPassword: string) {
    const SALT = process.env.CRYPTO_SALT;
    const userProvidedPassword = await createHmac('sha256', SALT)
      .update(userPassword)
      .digest('hex');

    if (userProvidedPassword === passwordHash) {
      return true;
    } else {
      return false;
    }
  }

  // GENERATE JWT TOKEN
  async generateJwtToken(payload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  // VALIDATE JWT TOKEN
  async verifyJwtToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      const { id, email } = payload;

      const user = await this.userModel
        .findOne({ _id: id })
        .select('-password');

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // VALIDATE AUTHORIZATION TOKEN IN HEADERS

  async verifyAuthorizationToken() {
    try {
      const authToken = this.request.headers.authorization;

      if (!authToken) {
        throw new UnauthorizedException('Unauthorized user');
      }

      const token = authToken.split('Bearer ')[1];
      const user = await this.verifyJwtToken(token);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

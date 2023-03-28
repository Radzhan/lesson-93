import {
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from '../auth/token-auth.guard';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  registerUser(@Req() req: Request) {
    const user = new this.userModel({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });

    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Get('secret')
  async secret(@Req() req: Request) {
    return req.user;
  }

  @Delete('sessions')
  async deleteOne(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.get('Authorization');

      const success = { message: 'OK' };

      if (!token) {
        return success;
      }

      const user = await this.userModel.findOne({ token });

      if (!user) {
        return success;
      }

      user.generateToken();
      await user.save();
      return success;
    } catch (e) {
      return e;
    }
  }
}

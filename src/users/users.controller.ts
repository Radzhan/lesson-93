import { Controller, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

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
}

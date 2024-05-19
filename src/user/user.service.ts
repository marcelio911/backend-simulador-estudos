// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOrCreate(userData: Partial<User>): Promise<User> {
    let user = await this.userModel.findOne({ email: userData.email });
    if (!user) {
      user = new this.userModel(userData);
      await user.save();
    }
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(data: Partial<IUser>): Promise<IUser> {
    return this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email });
  }

  async updateById(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(userId, data, { new: true });
  }
}

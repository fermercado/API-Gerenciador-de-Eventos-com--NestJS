import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserValidationService } from './user.validation.service';
import { HashService } from '../auth/hash.service';
import { JwtService } from '../auth/jwt.service';
import { UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserValidationService,
    HashService,
    JwtService,
  ],
  exports: [UserService],
})
export class UsersModule {}

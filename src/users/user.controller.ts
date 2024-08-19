import {
  Controller,
  Body,
  Param,
  Put,
  Post,
  UsePipes,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { ValidateUserUpdatePipe } from './pipes/validate-user-update.pipe';
import { ValidateUserCreationPipe } from './pipes/validate-user-creation.pipe';
import { formatUserResponse } from '../utils/format-user-response';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @UsePipes(ValidateUserCreationPipe)
  async createUser(@Body() userDto: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(userDto);
      return {
        statusCode: HttpStatus.CREATED,
        user: formatUserResponse(user),
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('sign-in')
  async loginUser(@Body() loginDto: LoginUserDTO) {
    try {
      const result = await this.userService.loginUser(loginDto);
      return {
        statusCode: HttpStatus.OK,
        token: result.token,
        user: formatUserResponse(result.user),
      };
    } catch (error: any) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @UsePipes(ValidateUserUpdatePipe)
  async updateUser(
    @Param('id') userId: string,
    @Body() updateDto: UpdateUserDTO,
  ) {
    try {
      const user = await this.userService.updateUser(userId, updateDto);
      return {
        statusCode: HttpStatus.OK,
        user: formatUserResponse(user),
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

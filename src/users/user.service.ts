import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { HashService } from '../auth/hash.service';
import { JwtService } from '../auth/jwt.service';
import { ApplicationError } from '../error/application.error';
import { IUser } from './user.model';
import { formatDateToISO } from '../utils/date.utils';

@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(data: CreateUserDTO): Promise<Omit<IUser, 'password'>> {
    const birthDate = formatDateToISO(data.birthDate);

    const hashedPassword = await this.hashService.hashPassword(data.password);

    const user = await this.userRepository.create({
      ...data,
      birthDate,
      password: hashedPassword,
    });

    return user.toObject() as Omit<IUser, 'password'>;
  }

  async loginUser(
    data: LoginUserDTO,
  ): Promise<{ token: string; user: Omit<IUser, 'password'> }> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new ApplicationError('Invalid email or password', 400);
    }

    const passwordMatch = await this.hashService.comparePassword(
      data.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new ApplicationError('Invalid email or password', 400);
    }

    const token = this.jwtService.generateToken({ userId: user._id });

    return {
      token,
      user: user.toObject() as Omit<IUser, 'password'>,
    };
  }

  async updateUser(
    userId: string,
    data: UpdateUserDTO,
  ): Promise<Omit<IUser, 'password'>> {
    const updateData: Partial<IUser> = { ...data };

    if (data.birthDate) {
      updateData.birthDate = formatDateToISO(data.birthDate.toString());
    }

    if (data.password) {
      updateData.password = await this.hashService.hashPassword(data.password);
    }

    const user = await this.userRepository.updateById(userId, updateData);

    if (!user) {
      throw new ApplicationError('User not found', 404);
    }

    return user.toObject() as Omit<IUser, 'password'>;
  }
}

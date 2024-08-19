import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { IUser } from '../user.model';

export interface UserServiceInterface {
  createUser(data: CreateUserDTO): Promise<Omit<IUser, 'password'>>;
  loginUser(
    data: LoginUserDTO,
  ): Promise<{ token: string; user: Omit<IUser, 'password'> }>;
}

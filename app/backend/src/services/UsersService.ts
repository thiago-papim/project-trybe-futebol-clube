import { compareSync } from 'bcryptjs';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import UserModel from '../models/UsersModel';
import { ServiceResponse } from '../Interfaces/users/UserResponse';
import { IUsers } from '../Interfaces/users/IUsers';
import loginValidator from '../utils/loginValidator';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UserModel(),
  ) { }

  public async findByEmail(
    email: IUsers['email'],
    password: IUsers['password'],
  ): Promise<ServiceResponse> {
    const user = await this.usersModel.findByEmail(email, password);
    if (!user || !compareSync(password, user.password) || !loginValidator(email, password)) {
      return { code: 401, data: { message: 'Invalid email or password' } };
    }
    return { code: 200, data: user };
  }

  // public async
}

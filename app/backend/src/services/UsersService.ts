import { IUsersModel } from '../Interfaces/users/IUsersModel';
import UserModel from '../models/UsersModel';
import { IUsers } from '../Interfaces/users/IUsers';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UserModel(),
  ) { }

  public async findByEmail(email: IUsers['email']): Promise<IUsers | null> {
    const user = await this.usersModel.findByEmail(email);
    return user;
  }
}

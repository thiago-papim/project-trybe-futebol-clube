import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import { IUsers } from '../Interfaces/users/IUsers';
// import { NewEntity } from '../Interfaces';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findByEmail(email: IUsers['email']): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}

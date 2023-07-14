import { IUsers } from './IUsers';

export interface IUsersModel {
  findByEmail(email: IUsers['email'], password: IUsers['password']): Promise<IUsers | null>
}

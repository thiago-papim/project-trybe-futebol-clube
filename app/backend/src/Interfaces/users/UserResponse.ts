import { IUsers } from './IUsers';

type successCode = 200;
type invalidCode = 401;
type invalidText = { message: 'Invalid email or password' } |
{ message: 'Invalid email or password' };

type success = {
  code: successCode,
  data: IUsers
};

type invalid = {
  code: invalidCode,
  data: invalidText
};

export type ServiceResponse = success | invalid;

// export interface ServiceResponse {
//   code: successCode | invalidCode,
//   data: IUsers | invalidText
// }

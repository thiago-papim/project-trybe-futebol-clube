import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default class validateToken {
  private password: string;
  private salt: string;

  constructor(password: string) {
    this.password = password;
    this.salt = genSaltSync(10);
  }

  public async validate(password: string) {
    const hash = hashSync(password, this.salt);
    console.log(hash);
    console.log(password);
    return compareSync(password, hash);
  }
}

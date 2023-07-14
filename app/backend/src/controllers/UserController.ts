import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  constructor(
    private userService = new UsersService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    const serviceResponse = await this.userService.findByEmail(email);
    res.status(200).json(serviceResponse);
  }
}

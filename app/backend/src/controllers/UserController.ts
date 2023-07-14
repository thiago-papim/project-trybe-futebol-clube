import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import { tokenGenerate } from '../utils/JWT';

export default class UsersController {
  constructor(
    private userService = new UsersService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const serviceResponse = await this.userService.findByEmail(email, password);
    if (serviceResponse.code !== 200) {
      return res.status(serviceResponse.code).json(serviceResponse.data);
    }
    const { id, email: emails, role } = serviceResponse.data;
    const token = tokenGenerate({ id, emails, role });
    return res.status(serviceResponse.code).json({ token });
  }
}

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // EVITAR EMAIL DUPLICADO
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    // Criando
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Salvando no banco de dados
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

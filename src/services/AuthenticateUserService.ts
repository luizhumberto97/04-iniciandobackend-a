import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // Verificar Email
    const user = await usersRepository.findOne({ where: { email } });

    // Se usuario nao for encontrado
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.passowrd - Senha criptografada
    // password - Senha não criptografada

    const passwordMatched = await compare(password, user.password);

    // Se a senha não bater
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, // Sempre id do usuario para verificar o token
      expiresIn, // Quando tempo o token vai ficar logado -> logado para sempre tem que ver refresh token
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

// Subir a imagem do usuario e deletar a antiga
// Validar se o usuario autenticado existe

import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
// Importar o upload
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  // Vai receber o id e o nome do arquivo
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // Verificar que o id está recebendo se é valido
    const user = await usersRepository.findOne(user_id);

    // Se não encontrou
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // Se ter um avatar
    if (user.avatar) {
      // Deletar avatar anterior
      // REmove o que ja está armazenado
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Checar se esse arquivo realmente existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Se o arquivo existe, vou deletar ele
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Atualizar o usuario
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

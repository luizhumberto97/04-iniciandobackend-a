import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
app.use(cors());

app.use(express.json());

// Para aparecer a imagem no navegador
// assim será o link http://localhost:3333/files/codigodaImagem
app.use('/files', express.static(uploadConfig.directory));

app.use(routes); // Usando o routes que serve como middleware

// Middleware tratativa de erro
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // Erro que conheço
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(' Server Started on Port 3333!');
});

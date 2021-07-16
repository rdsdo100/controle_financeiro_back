import 'reflect-metadata';
import 'express-async-errors';
import express, { Response, Request, NextFunction } from 'express';
import '../typeorm';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { routes } from './routes';
import cors from 'cors';
import AppError from '@config/errors/AppError';

dotenv.config();

const PORT = Number(process.env.PORT || 3333);

const app = express();

app.use(cors());

app.use(express.json());

// app.use('/files', express.static(uploadConfig.directory));

app.use(express.static('./public'));

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(PORT, () => {
    console.log(`Server open in port: ${PORT} `);
});

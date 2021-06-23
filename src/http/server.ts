import 'reflect-metadata';
import '../config/DataBaseConfig';
//import uploadConfig from './config/upload'
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import AppError from '../config/errors/AppError';

dotenv.config();
const PORT = Number(process.env.PORT || 3333);

const app = express();
app.use(express.json());

// app.use('/files', express.static(uploadConfig.directory));

app.use(express.static('./public'));

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: error,
            message: error.message,
        });
    } else {
        return response.status(500).json({
            status: 'error',
            message: 'Internal server Error',
            error: error,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server aberto na porta: ${PORT} `);
});

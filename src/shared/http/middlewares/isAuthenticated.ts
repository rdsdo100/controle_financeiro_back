import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('Não autenticado', 401);
    }
    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as ITokenPayload;

        request.body.user = {
            id: sub,
        };
        return next();
    } catch (err) {
        
        throw new AppError('Erro ao altenticar token', 401);
    }
}

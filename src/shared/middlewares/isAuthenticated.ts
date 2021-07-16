import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../../config/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new AppError('Não autenticado', 401);
    }
 

    try {

         jwt.verify(authorization, String(process.env.JWT_TOKEN),
          (err: any, decoded: any) => {
             if (err) {
                 return response.json({
                     err,
                     menssage: 'invalid!',
                     isvalid: false,
                 });
             }

             request.body.decoded = decoded;

             return next();
         });

    } catch (err) {
        
        throw new AppError('Error while token altenticate!', 401);
    }
}

import jwt from 'jsonwebtoken';

import AppError from './errors/AppError';

export default class AuthJwt {
    async assinar(usuario: Usuarios) {
        if (usuario.ativo) {
            const token = jwt.sign(
                { id: usuario.id, nomeUsuario: usuario.nomeUsuario, nomeAdministrador: usuario.administrador },
                String(process.env.JWT_TOKEN),
                { expiresIn: '10d' },
            );
            return token;
        } else {
           throw new AppError("usuariao Não pode ser assinado. user = inativo!")
        }
    }
}

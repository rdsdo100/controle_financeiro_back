import { IUser } from '@modules/users/domain/models/IUser';
import jwt from 'jsonwebtoken';


export default class AuthJwt {
    async assinar(user: IUser) {
       
            const token = jwt.sign(
                { id: user.id, nameUser: user.name },
                String(process.env.JWT_TOKEN),
                { expiresIn: '10d' },
            );
            return token;
        
    }
}

import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();

        if (!request.file) {
            throw new AppError('Faltou a  imagem animal!', 400);
        }
        const user: any = await updateAvatar.excute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.status(200).json(user);
    }
}

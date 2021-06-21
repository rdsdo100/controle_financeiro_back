import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploadConfig';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController()
const  upload = multer(uploadConfig)

usersRouter.get('/', isAuthenticated ,usersController.index);

usersRouter.patch(
    '/avatar',

    isAuthenticated,

    upload.single('avatar'),
    usersAvatarController.update
);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object()
            .options({ abortEarly: false })
            .keys({
                // para retornar todos os campos com erro.
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }),
    }),
    usersController.create,
);

export default usersRouter


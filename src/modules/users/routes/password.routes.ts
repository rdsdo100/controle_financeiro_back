import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetpasswordController from '../controllers/ResetpasswordController';


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetpasswordController()

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: Joi.object().options({ abortEarly: false }).keys({
            // para retornar todos os campos com erro.
            email: Joi.string().email().required(),
        }),
    }),
    forgotPasswordController.create,
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: Joi.object()
            .options({ abortEarly: false })
            .keys({
                // para retornar todos os campos com erro.
                token: Joi.string().uuid().required(),
                password: Joi.string().required(),
                passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
            }),
    }),
    resetPasswordController.create,
);


export default passwordRouter;

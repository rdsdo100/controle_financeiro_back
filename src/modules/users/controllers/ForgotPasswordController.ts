import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {email} = request.body;

        const setdForgtPasswordEmail = new SendForgotPasswordEmailService();
        await setdForgtPasswordEmail.excute({email});

        return response.status(204).json();
    }
}

export default ForgotPasswordController;

import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

class ResetpasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;

        const resetPassword = new ResetPasswordService();
        await resetPassword.excute({ token, password });

        return response.status(204).json();
    }
}
export default ResetpasswordController
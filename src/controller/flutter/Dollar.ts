import { Request, Response } from 'express';

export default class Dollar {
    async index(_: Request, response: Response): Promise<Response> {
        return response.status(200).json({ dolar: 4.5, euro: 5.5 });
    }
}

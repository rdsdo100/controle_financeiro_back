import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Usuarios } from "../entity/Usuarios";


export function assinar(usuario: Usuarios) {

    if (usuario.ativo && !usuario.bloqueado) {
        const token = jwt.sign(
            { id: usuario.id, nomeUsuario: usuario.nomeUsuario },
            String(process.env.JWT_TOKEN),
            { expiresIn: '1d' })
        return token

    } else {
        return "Usuario Incorreto!"
    }
}

export function decodificar(request: Request, response: Response, next: NextFunction) {

    let authorization = String(request.headers.authorization)

    jwt.verify(authorization,
        String(process.env.JWT_TOKEN),
        (err: any, decoded: any) => {
            if (err) {
                return response.json({
                    err,
                    menssage: "invalido!!!!",
                    isvalid: false

                })

            }

            request.body.decoded = decoded

            return next()

        })

}

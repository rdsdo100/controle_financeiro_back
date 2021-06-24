import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Usuarios } from "../entity/Usuarios";

export default class AuthJwt {



  async assinar(usuario: Usuarios) {

    if (usuario.ativo && !usuario.bloqueado) {
        const token = jwt.sign(
            { id: usuario.id, nomeUsuario: usuario.nomeUsuario },
            String(process.env.JWT_TOKEN),
            { expiresIn: '10d' })
        return token

    } else {
        return "Usuario Incorreto!"
    }
}

 
}
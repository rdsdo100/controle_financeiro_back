import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'


   export function assinar(id:number , nomeUsuario:string , tipoUsuario:number ){

        const token = jwt.sign(
            {id, nomeUsuario , tipoUsuario } ,
            String(process.env.JWT_TOKEN)  ,
            {expiresIn: '1d'})
      return token

    }

    export function decodificar(request:Request , response: Response, next:NextFunction){

        let authorization=  String(request.headers.authorization)

        jwt.verify(authorization ,
            String(process.env.JWT_TOKEN),
            (err:any , decoded: any) =>{
            if(err){
                return response.json({
                    err ,
                    menssage: "invalido!!!!" ,
                isvalid: false

                })

            }

            request.body.decoded = decoded

            return next()

        })

    }

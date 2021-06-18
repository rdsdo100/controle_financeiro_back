import 'reflect-metadata';
import '@shared/typeOrm'
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import {errors} from 'celebrate'
import AppError from "../errors/AppError";
import { routes } from '@shared/http/route';



const app = express();
app.use(express.json())

app.use(routes)

app.use(errors());



app.use(
  (error :Error, request: Request , response: Response , next: NextFunction)=>{

if(error instanceof AppError){

  return response.status(error.statusCode).json({
    status: error,
    message: error.message
  })
  
} else{
  return response.status(500).json({
    status: 'error',
    message: 'Internal server Error',
    error: error
  })
}


});

app.listen(3333 , ()=>{console.log("ok")})
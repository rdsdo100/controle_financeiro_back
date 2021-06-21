import 'reflect-metadata';
import '@shared/typeOrm'
import express, {Request , Response , NextFunction} from "express";
import 'express-async-errors'
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/uploadConfig';
import { routes } from './route';



const PORT = Number(process.env.PORT || 3333);
const app = express();
app.use(express.json())

app.use('/files', express.static(uploadConfig.directory));

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


app.listen(PORT , ()=>{
  console.log(`Rodando na porta ${PORT}!`)
})
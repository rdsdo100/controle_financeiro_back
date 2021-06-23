import { Server } from '@overnightjs/core';
import cors from 'cors'
import express from 'express';
import {routes} from './routes/routes';


export class SetupServer extends Server {

  constructor(private port = 3333) {
   super()
  }

  public async init(): Promise<void> {
    this.setupExpress();


  }

  private setupExpress(): void {
    this.app.use(cors())
   
    this.app.use(express.json());
    
    this.setupControllers();
    this.app.use(express.static('./public')); // para buscar arquivos estaticos como as imagem do banco
  }

  private setupControllers(): void {
    
    this.addControllers(routes);
    
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server aberto na porta: ' + this.port);
    });
  }
}


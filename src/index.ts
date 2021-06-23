import "reflect-metadata";
import './config/DataBaseConfig'
import dotenv from "dotenv"
import {SetupServer} from "./server";
dotenv.config()
const port = Number(process.env.PORT || 3333)

    const server = new SetupServer(port);
     server.init();
    server.start()

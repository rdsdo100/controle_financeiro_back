import {createConnection} from "typeorm";


createConnection()
    .then(() => console.log("Connection started successfully!"))
    .catch(error => console.log(error));

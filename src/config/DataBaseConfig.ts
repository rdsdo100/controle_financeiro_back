import {createConnection} from "typeorm";


createConnection()
    .then(() => console.log("Conxão com banco iniciada com sucesso!"))
    .catch(error => console.log(error));

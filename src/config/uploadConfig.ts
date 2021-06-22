import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


// configurações do multer para salvar arquivos//
const uploadFoader = path.resolve(__dirname, '..', '..', 'uploads'); // localização da pasta onse sera salvo
export default { // objeto de configuração
    directory: uploadFoader, // 
    storage: multer.diskStorage({
        destination: uploadFoader, //localização da pasta onse sera salvo
        filename(request, file, callback) { //função par renomear o arquivo e tratar o mesmo.
            const fileHash = crypto.randomBytes(10).toString('hex'); //grar hash para concatenar com o nome e assim gerar o o nome sem repetir.

            const fileName = `${fileHash}-${file.originalname}`; // concatenação do nome  com o hash

            callback(null, fileName); //retono callbak de função para  gerar o nome.
        },
    }),
};

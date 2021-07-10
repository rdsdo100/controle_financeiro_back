
import nodemailer from 'nodemailer'
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IEmailContact {
  name: string
  email: string
}

interface ItemplateVariable{
  [keu:string] : string | number
}

interface IParseMailTemplate {
    file: string;
    variables: ItemplateVariable;
}


interface Isendmail {
    to: IEmailContact;
    from?: IEmailContact;
    subject: string;
    tampleteData: IParseMailTemplate;
}


export default class EtherealMail {

static async sendMail ({to , from , subject , tampleteData}: Isendmail): Promise<void> {

  const  account = await nodemailer.createTestAccount()
  const handlebarsMailTemplate = new HandlebarsMailTemplate();
    const trasporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
    });
    const message = await trasporter.sendMail({
        from: {
            name: from?.name || 'Equipe REDSDO',
            address: from?.email || 'rdsdo@rdsdo.com',
        },
        to: {
            name: to.name,
            address: to.email,
        },
        subject: subject,
        html: await handlebarsMailTemplate.parcer(tampleteData),
    });

    console.log("message sent %s" , message.messageId)
    console.log('Preview URL %s' , nodemailer.getTestMessageUrl(message));
  
}


}
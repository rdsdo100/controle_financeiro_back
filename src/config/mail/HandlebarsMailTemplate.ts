import fs from "fs";
import Handlebars from "handlebars";

interface ItemplateVariable{
  [keu:string] : string | number
}

interface IParseMailTemplate {
    file: string;
    variables: ItemplateVariable;
}


export default class HandlebarsMailTemplate {
    public async parcer({ file, variables }: IParseMailTemplate): Promise<string> {
     const templateFileContent = await fs.promises.readFile(file, {encoding: 'utf-8'})
      const parserTemplate = Handlebars.compile(templateFileContent);  
      
      return parserTemplate(variables);
    }
}
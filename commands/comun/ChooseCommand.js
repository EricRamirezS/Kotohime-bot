const commando = require('discord.js-commando');

class ChooseCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'escoger',
            group: 'comun',
            memberName: 'escoger',
            aliases: ['choose'],
            description: 'Elige entre varias opciones proporcionadas.',
            args: [
                {
                    key: 'opciones',
                    prompt: '',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(message, args){
        if (!(args.opciones==='')){
            let texto = args.opciones;
            let finalizado = false;
            let arrayOpciones = [];
            let ini = -1;
            let fin = -1;
            while(!finalizado){
                ini = -1;
                fin = -1;
                for(let i=0; i < texto.length;i++){
                    if(texto.charAt(i)==='"'){
                        if(ini===-1){
                            ini=i;
                        }else{
                            fin = i;
                            break;
                        }
                    }
                }
                if(ini===-1 && fin===-1){
                    finalizado=true;
                }else{
                    let subStr = texto.substr(ini,fin+1);
                    texto = texto.replace(subStr,'');
                    subStr = subStr.replace("\" ", "\"");
                    arrayOpciones.push(subStr);
                }
            }
            let arrayOpciones2 = texto.split(" ");
            for(let i=0; i < arrayOpciones2.length;i++) {
                arrayOpciones.push(arrayOpciones2[i])
            }
            for(let i=0; i < arrayOpciones.length;i++){
                if(arrayOpciones[i]==='')
                    arrayOpciones.splice(i,1);
            }
            let choose = Math.floor(Math.random() * arrayOpciones.length);
            message.channel.send("¡Escojo "+arrayOpciones[choose]+"!");
        }
        else{
            message.channel.send("¡No hay nada de lo cual escoger!");
        }
    }
}

module.exports = ChooseCommand;

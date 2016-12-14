import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import {
    readToken
} from './codigo';

const gist = async(file) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        await crearGist(file,token);
    }
}

function crearGist(file,token) {

    let contenido = fs.readFileSync('./gist/' + file,"utf8");

    return new Promise((resolve, reject) => {

        let client = github.client(token);
        let ghgist = client.gist();

        ghgist.create({
            description: "Gist by automatizacion-vagos",
            public: true,
            files: {
                fichero: {
                    "filename": file,
                    "content": contenido
                }
            }
        }, (err) => {
        });
    });
}

export { gist };

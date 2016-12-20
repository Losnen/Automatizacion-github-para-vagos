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
        await crearGist(file, token);
    }
}

function crearGist(file, token) {

    return new Promise((resolve, reject) => {


        try {
            let contenido = fs.readFileSync('./gist/' + file, "utf8");
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
                if (err) {
                    console.log("Error: " + err.statusCode + ": " + err.message);
                } else {
                    console.log("Gist creado con éxito");
                }
            });
        } catch (e) {
            console.log("No existe el fichero en el directorio gist/" + file);
            process.exit(1);
        }
    });
}

export {
    gist
};

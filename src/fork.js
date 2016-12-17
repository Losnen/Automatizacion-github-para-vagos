import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import { readToken } from './codigo';

const fork = async(datos) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        await crearFork(datos, token);
    }
}

function crearFork(datos, token) {

    return new Promise((resolve, reject) => {

        let client = github.client(token);
        let ghme = client.me();

        ghme.fork(datos, (err) => {
            if (err) console.log(err);
        });
    });
}
export { fork };

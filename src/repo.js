import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import { readToken } from './codigo';

const repo = async (datos) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
    } else {
        let token = readToken();
        await createRepo(datos, token);
    }
}

function createRepo(datos, token) {

    return new Promise((resolve, reject) => {

        let client = github.client(token);
        let ghme = client.me();

        ghme.repo({
            "name": datos.r,
            "description": "Repo created by automatización para vagos",
        }, (err, status, body, headers) => {
            if (err) {
                reject(err);
            } else {

                require('simple-git')()
                    .init()
                    .addRemote('origin', 'git@github.com:' + body.login + '/' + datos.r + '.git');

                console.log("Su repo se ha creado con éxito");
                resolve(body);
            }
        });
    });
}

export { repo };

import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import { readCmdLine } from './codigo';
import fs from 'fs';

const init = async() => {

    if (fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
      console.log('Su token ya se ha generado y se encuentra en ' + process.env.HOME + '/.automatizacion-para-vagos/token.json')
    } else {
        let datos = await readCmdLine();
        let token = await createToken(datos);
        fs.mkdirSync(process.env.HOME + '/.automatizacion-para-vagos');
        fs.writeFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json', '{ "token": "' + token + '" }');
        console.log('Token guardado con éxito en' + process.env.HOME + '/.automatizacion-para-vagos/token.json');
    }
}

function createToken(data) {

    return new Promise((resolve, reject) => {
        github.auth.config({
            username: data.usr,
            password: data.passwd
        }).login({
            scopes: ['user', 'repo'],
            note: 'automatizacion-para-vagos'
        }, (err, id, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}


export { init };

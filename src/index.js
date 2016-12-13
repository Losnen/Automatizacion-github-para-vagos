import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';

export async function init() {

    let datos = await readCmdLine();
    let token = await createToken(datos);
    fs.mkdirSync(process.env.HOME + '/.automatizacion-para-vagos');
    fs.writeFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json','{ "token": "' + token + '" }');
    console.log('Token guardado con éxito en' + process.env.HOME + '/.automatizacion-para-vagos/token.json');

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

function () {
  
}

function readCmdLine() {

    return new Promise((resolve, reject) => {
        var questions = [{
            type: 'input',
            name: 'usr',
            message: 'Nombre de usuario en github'
        }, {
            type: 'password',
            message: 'Contraseña de github',
            name: 'passwd'
        }];

        inquirer.prompt(questions).then((answers) => {
            resolve(answers);
        });
    });
}

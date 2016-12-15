import "babel-polyfill";
import inquirer from 'inquirer';
import fs from 'fs';
import github from 'octonode';

export function readCmdLine() {

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

export function readToken() {

    let file = fs.readFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json', "utf8");
    file = JSON.parse(file);
    return (file.token);
}

export function getBody() {

    return new Promise((resolve, reject) => {
        let token = readToken();
        let client = github.client(token);
        client.get('/user', {}, (err, status, body, headers) => {
            resolve(body);
        });
    });
}

import "babel-polyfill";
import inquirer from 'inquirer';
import fs from 'fs';

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

    let file = fs.readFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json',"utf8");
    file = JSON.parse(file);
    return(file.token);
}

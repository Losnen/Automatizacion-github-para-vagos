import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import {
    readToken,
    getBody
} from './codigo';

const colaboradores = async(repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        let usr = await getBody();
        await mostrarColaboradores(repo, token, usr);
    }
}

function mostrarColaboradores(repo, token, user) {

    return new Promise((resolve, reject) => {
        let aux = user.login + '/' + repo;
        let client = github.client(token);
        let ghrepo = client.repo(aux);

        ghrepo.collaborators((err, contributors) => {
            if (err) {
                console.log("Error: " + err.statusCode + ": " + err.message);
            } else {
                if (contributors != undefined) {
                    console.log(" ");
                    console.log("Colaboradores del repo: ");
                    console.log(" ");
                }
                for (let i = 0; i < contributors.length; i++) {
                    console.log(contributors[i].login);
                }
                console.log(" ");
                resolve(contributors);
            }

        });
    });
}

export {
    colaboradores
};

import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import { readToken, getBody } from './codigo';

const borrar = async (repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        let usr = await getBody();
        await borrarRepo(repo,token,usr);
    }
}

function borrarRepo(repo,token,user) {

    return new Promise((resolve, reject) => {
        let aux = user.login + '/' + repo;
        let client = github.client(token);
        let ghrepo = client.repo(aux);
        ghrepo.destroy((err) => {
          if (err) console.log(err);
        });
    });
}

export { borrar };

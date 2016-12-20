import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import {
    readToken,
    getBody
} from './codigo';

const commits = async(repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        let usr = await getBody();
        await mostrarCommits(repo, token, usr);
    }
}

function mostrarCommits(repo, token, user) {

    return new Promise((resolve, reject) => {
        let aux = user.login + '/' + repo;
        let client = github.client(token);
        let ghrepo = client.repo(aux);

        ghrepo.commits((err, listacommits) => {
            if (err) console.log("Error: " + err.statusCode + ": " + err.message);
            try {
                if (listacommits != undefined) {
                    console.log("Commits del repo: ");
                    console.log(" ");
                }
                for (var i = 0; i < listacommits.length; i++) {
                    console.log(listacommits[i].commit.message);
                }
                console.log(" ");
                resolve(listacommits);
            } catch (e) {
              console.log("El repo no tiene commits o no existe");
            }

        });
    });
}

export {
    commits
};

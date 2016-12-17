import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import { readToken, getBody, readCmdLineBranches } from './codigo';

const compareBranches = async (repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        let usr = await getBody();
        let answers = await readCmdLineBranches();
        await compararRamas(repo,token,usr,answers);
    }
}

function compararRamas(repo,token,user,answers) {

    return new Promise((resolve, reject) => {
        let aux = user.login + '/' + repo;
        let client = github.client(token);
        let ghrepo = client.repo(aux);

        ghrepo.branches((err, ramas) => {
          if (err) console.log(err);
          console.log(ramas);
        });

        ghrepo.compare(answers.rama1,answers.rama2,(err,comparation) => {
          if (err) console.log(err);
          console.log(comparation);
        });
    });
}

export { compareBranches };

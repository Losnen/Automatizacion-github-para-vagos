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
        await getRamas(repo,token,usr);
        let answers =  await readCmdLineBranches();
        await compararRamas(repo,token,usr,answers);
    }
}

function compararRamas(repo,token,user,answers) {

    return new Promise((resolve, reject) => {
        let aux = user.login + '/' + repo;
        let client = github.client(token);
        let ghrepo = client.repo(aux);

        ghrepo.compare(answers.rama1,answers.rama2,(err,comparation) => {
          if (err) console.log(err);
          console.log("Ultimos commits en las ramas: ");
          console.log(" ");
          console.log("Rama 1: " + comparation.base_commit.commit.message);
          console.log("Rama 2: " + comparation.merge_base_commit.commit.message);
          console.log(" ");
          resolve(comparation);
        });
    });
}

function getRamas(repo,token,user) {

    return new Promise((resolve, reject) => {
        let aux = user.login + '/' + repo;
        let client = github.client(token);
        let ghrepo = client.repo(aux);

        console.log("Ramas del repositorio: ")
        console.log(" ");

        ghrepo.branches((err, ramas) => {
          if (err) console.log(err);
            for (let i = 0; i < ramas.length; i++) {
              console.log(ramas[i].name);
            }
            console.log(" ");
            resolve(ramas);
        });
    });
}

export { compareBranches };

import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import shell from 'shelljs';
import Dropbox from 'dropbox';
import {
    readToken,
    getBody,
    readDropboxToken
} from './codigo';

const deploy = async(repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/dropbox.json')) {

        let token = await createToken();
        fs.writeFileSync(process.env.HOME + '/.automatizacion-para-vagos/dropbox.json', '{ "token": "' + token + '" }');
        console.log('Token guardado con éxito en' + process.env.HOME + '/.automatizacion-para-vagos/dropbox.json');
        await subirFicheros(token);

    } else {
        let token = readDropboxToken();
        await subirFicheros(token);
    }
}

function subirFicheros(token) {

    return new Promise((resolve, reject) => {

        if (!fs.existsSync('./README.pdf')) {
            console.log(" ");
            console.log("No existe el fichero README.pdf, generelo con el comando automatizacion-vagos -e");
            console.log(" ");
            process.exit(1);
        }

        let file = fs.readFileSync('./README.pdf');

        var dbx = new Dropbox({
            accessToken: token
        });

        dbx.filesUpload({
                path: '/README.pdf',
                contents: file,
                mode: {
                    ".tag": "overwrite"
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

function createToken() {

    return new Promise((resolve, reject) => {
        var questions = [{
            type: 'input',
            name: 'token',
            message: 'Token de dropbox'
        }];

        inquirer.prompt(questions).then((answers) => {
            resolve(answers.token);
        });
    });
}

export {
    deploy
};

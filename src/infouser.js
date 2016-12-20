import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import {
    readToken
} from './codigo';

const user = async(datos) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        await getUserInfo(datos, token);
    }
}

function getUserInfo(datos, token) {

    return new Promise((resolve, reject) => {

        let client = github.client(token);
        let ghuser = client.user(datos);
        ghuser.info((err, info) => {
            if (err) console.log("Error: " + err.statusCode + ": " + err.message);
            console.log(" ");
            console.log("Usuario: " + info.login);
            console.log("Nombre: " + info.name);
            console.log("Compañia: " + info.company);
            console.log("Email: " + info.email);
            console.log("Blog: " + info.blog);
            console.log("Localización: " + info.location);
            console.log("bio: " + info.bio);
            console.log("Followers: " + info.followers);
            console.log("Following: " + info.following);
            console.log(" ");
        });
    });
}

export {
    user
};

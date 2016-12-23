import "babel-polyfill";
import fs from 'fs';
import path from 'path';

const deploy = async(opcione, opcionp) => {

    let plugin = "subir-nube-vagos";

    try {
        let dirPlugin = path.resolve(process.cwd(), 'node_modules', plugin);
        const req = require(dirPlugin);

        if (opcione) {
            req.generar();
        } else if (opcionp) {
            req.pushear();
        } else {
            console.log("No ha añadido ninguna opción, introduca una de las siguientes: ");
            console.log("Ejecuta automatizacion-vagos -g -e para generar el README.pdf");
            console.log("Ejecuta automatizacion-vagos -g -p para subir el README.pdf a Dropbox");
        }

    } catch (err) {
        console.log("Error al cargar la dependencia: " + plugin);
        console.log("Ejecute npm i -S subir-nube-vagos para instalar el plugin");
    }
}

export {
    deploy
};

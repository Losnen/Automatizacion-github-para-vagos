import "babel-polyfill";
import fs from 'fs';
import path from 'path';

const deploy = async(opciong, opcionp) => {

    let plugin = "subir-nube-vagos";

    try {
        let dirPlugin = path.resolve(process.cwd(), 'node_modules', plugin);
        const req = require(dirPlugin);

        if (opciong) {
            req.generar();
        } else if (opcionp) {
            req.pushear();
        } else {
            console.log();
        }

    } catch (err) {
        console.log("Error al cargar la dependencia: " + plugin + "Ejecute npm i -S subir-nube-vagos");
    }
}

export {
    deploy
};

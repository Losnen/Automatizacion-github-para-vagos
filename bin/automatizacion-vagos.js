#!/usr/bin/env node

const build = require('../build');
const argv = require('minimist')(process.argv.slice(2));


if (argv.i | argv.init) {

    build.init();

} else if (argv.r) {

    build.repo(argv);

} else if (argv.b) {

    build.borrar(argv.b);

} else if (argv.g) {

    build.gist(argv.g);
    console.log("Gist Creado con éxito");

} else {

    console.log('Opción inválida, introduca automatizacion-vagos -h para ver los comandos válidos');

}

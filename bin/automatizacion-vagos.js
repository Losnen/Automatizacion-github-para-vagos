#!/usr/bin/env node

const build = require('../build');
const argv = require('minimist')(process.argv.slice(2));


if (argv.i | argv.init) {

    build.init();

} else if (argv.r) {

    build.repo(argv);

} else if (argv.b | argv.borrar) {

  

} else {

  console.log('Opción inválida, introduca automatizacion-vagos -h para ver los comandos válidos');

}

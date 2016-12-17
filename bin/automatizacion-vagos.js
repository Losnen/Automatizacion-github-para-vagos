#!/usr/bin/env node

const build = require('../build');
const argv = require('minimist')(process.argv.slice(2));

if (argv.i | argv.init) {

    build.init();

} else if (argv.r) {

    build.repo(argv);

} else if (argv.b) {

    build.borrar(argv.b);
    console.log("Repo " + argv.b + " eliminado con éxito");

} else if (argv.g) {

    build.gist(argv.g);
    console.log("Gist " + argv.g + " Creado con éxito");

} else if (argv.h) {

  console.log(' ');
  console.log('Usage: automatizacion-vagos [options]');
  console.log(' ');
  console.log('Options:');
  console.log(' ');
  console.log('  -i           \t Genera el token.');
  console.log('  -r [mi-repo] \t Crea el repositorio mi-repo');
  console.log('  -b [mi-repo] \t Borra el repositorio mi-repo');
  console.log('  -g [file.js] \t Crea un gist con el fichero file.js');
  console.log(' ');

} else if(argv.c){
  build.colaboradores(argv.c);


} else if (argv.l) {
  build.commits(argv.l)

} else {

    console.log('Opción inválida, introduca automatizacion-vagos -h para ver los comandos válidos');

}

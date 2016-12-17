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

} else if (argv.c) {

    build.colaboradores(argv.c);

} else if (argv.l) {

    build.commits(argv.l)

} else if (argv.m) {

    build.compareBranches(argv.m);

} else if (argv.o) {

    build.organizacion();

} else if (argv.f) {

    build.fork(argv.f);
    console.log("Fork completado con éxito");

} else if (argv.u) {

    build.user(argv.u);

} else if (argv.p) {

    build.pull(argv.p);

} else if (argv.a) {

    let commit = argv.a + " ";
    for (let i = 0; i < argv._.length; i++) {
        commit = commit + argv._[i] + " ";
    }

    require('simple-git')()
        .add('.')
        .commit(commit)
        .push(['origin', 'master'], () => {});


} else if (argv.v) {

    console.log(' ');
    console.log('Versión: ' + require('../package.json').version);
    console.log(' ');

} else if (argv.h) {

    console.log(' ');
    console.log('Usage: automatizacion-vagos [options]');
    console.log(' ');
    console.log('Options:');
    console.log(' ');
    console.log('  -i             \t Genera el token.');
    console.log('  -r [mi-repo]   \t Crea el repositorio mi-repo');
    console.log('  -b [mi-repo]   \t Borra el repositorio mi-repo');
    console.log('  -g [file.js]   \t Crea un gist con el fichero file.js');
    console.log('  -c [mi-repo]   \t Obtiene los colaboradores del repositorio mi-repo');
    console.log('  -l [mi-repo]   \t Lista los commits del repositorio mi-repo');
    console.log('  -m [mi-repo]   \t Lista las ramas y permite realizar una comparacion entre dos ramas.');
    console.log('  -f [user/repo] \t Hace un fork de user/repo');
    console.log('  -u [user]      \t Muestra información sobre el usuario user');
    console.log('  -p [mi-repo]   \t Hace un pull resuest de un repositorio que tenemos forkeado');
    console.log('  -a [commit]    \t Ejecuta git add, git commit y git push en un solo paso.');
    console.log('  -v             \t Muestra la versión del CLI');
    console.log('  -o             \t Devuelve una lista con mis organizaciones');
    console.log(' ');

} else {

    console.log('Opción inválida, introduca automatizacion-vagos -h para ver los comandos válidos');

}

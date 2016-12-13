#!/usr/bin/env node

const build = require('../build');
const program = require('commander');

program
    .version('0.0.1')
    .usage('[options]')
    .option('-i, --init', 'Inicializa el github token')
    .option('-r, --repo [nombre]', 'Crea un repositorio en github [mi-repo-de-vagos]', 'mi-repo-de-vagos')
    .parse(process.argv);

if (program.init) {
    build.init();
} else if (program.repo) {
    console.log(program.repo)
}

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readCmdLine = readCmdLine;
exports.readToken = readToken;

require('babel-polyfill');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readCmdLine() {

    return new Promise(function (resolve, reject) {
        var questions = [{
            type: 'input',
            name: 'usr',
            message: 'Nombre de usuario en github'
        }, {
            type: 'password',
            message: 'Contraseña de github',
            name: 'passwd'
        }];

        _inquirer2.default.prompt(questions).then(function (answers) {
            resolve(answers);
        });
    });
}

function readToken() {

    var file = _fs2.default.readFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json', "utf8");
    file = JSON.parse(file);
    return file.token;
}
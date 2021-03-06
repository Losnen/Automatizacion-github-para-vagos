'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readCmdLine = readCmdLine;
exports.readCmdLineBranches = readCmdLineBranches;
exports.readToken = readToken;
exports.readDropboxToken = readDropboxToken;
exports.getBody = getBody;

require('babel-polyfill');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _octonode = require('octonode');

var _octonode2 = _interopRequireDefault(_octonode);

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

function readCmdLineBranches() {

    return new Promise(function (resolve, reject) {
        var questions = [{
            type: 'input',
            name: 'rama1',
            message: 'Nombre de la primera rama'
        }, {
            type: 'input',
            message: 'Nombre de la segunda rama',
            name: 'rama2'
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

function readDropboxToken() {

    var file = _fs2.default.readFileSync(process.env.HOME + '/.automatizacion-para-vagos/dropbox.json', "utf8");
    file = JSON.parse(file);
    return file.token;
}

function getBody() {

    return new Promise(function (resolve, reject) {
        var token = readToken();
        var client = _octonode2.default.client(token);
        client.get('/user', {}, function (err, status, body, headers) {
            if (err) console.log("Error: " + err.statusCode + ": " + err.message);
            resolve(body);
        });
    });
}
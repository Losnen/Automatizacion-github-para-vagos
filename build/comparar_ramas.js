'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compareBranches = undefined;

require('babel-polyfill');

var _octonode = require('octonode');

var _octonode2 = _interopRequireDefault(_octonode);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _codigo = require('./codigo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var compareBranches = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(repo) {
        var token, usr, answers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (_fs2.default.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
                            _context.next = 8;
                            break;
                        }

                        console.log(' ');
                        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
                        console.log(' ');
                        console.log('Para mas información, ejecute automatizacion-vagos -h');
                        console.log(' ');
                        _context.next = 19;
                        break;

                    case 8:
                        token = (0, _codigo.readToken)();
                        _context.next = 11;
                        return (0, _codigo.getBody)();

                    case 11:
                        usr = _context.sent;
                        _context.next = 14;
                        return getRamas(repo, token, usr);

                    case 14:
                        _context.next = 16;
                        return (0, _codigo.readCmdLineBranches)();

                    case 16:
                        answers = _context.sent;
                        _context.next = 19;
                        return compararRamas(repo, token, usr, answers);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function compareBranches(_x) {
        return _ref.apply(this, arguments);
    };
}();

function compararRamas(repo, token, user, answers) {

    return new Promise(function (resolve, reject) {
        var aux = user.login + '/' + repo;
        var client = _octonode2.default.client(token);
        var ghrepo = client.repo(aux);

        ghrepo.compare(answers.rama1, answers.rama2, function (err, comparation) {
            if (err) console.log(err);
            console.log("Ultimos commits en las ramas: ");
            console.log(" ");
            console.log("Rama 1: " + comparation.base_commit.commit.message);
            console.log("Rama 2: " + comparation.merge_base_commit.commit.message);
            console.log(" ");
            resolve(comparation);
        });
    });
}

function getRamas(repo, token, user) {

    return new Promise(function (resolve, reject) {
        var aux = user.login + '/' + repo;
        var client = _octonode2.default.client(token);
        var ghrepo = client.repo(aux);

        ghrepo.branches(function (err, ramas) {
            if (err) console.log("Error: " + err.statusCode + ": " + err.message);
            try {
                if (ramas != undefined) {
                    console.log("Ramas del repositorio: ");
                    console.log(" ");
                }
                for (var i = 0; i < ramas.length; i++) {
                    console.log(ramas[i].name);
                }
                console.log(" ");
                resolve(ramas);
            } catch (e) {
                console.log("No existen ramas para ese repo o el repo no existe.");
            }
        });
    });
}

exports.compareBranches = compareBranches;
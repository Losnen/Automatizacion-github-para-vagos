'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.colaboradores = undefined;

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

var colaboradores = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(repo) {
        var token, usr;
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
                        _context.next = 14;
                        break;

                    case 8:
                        token = (0, _codigo.readToken)();
                        _context.next = 11;
                        return (0, _codigo.getBody)();

                    case 11:
                        usr = _context.sent;
                        _context.next = 14;
                        return mostrarColaboradores(repo, token, usr);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function colaboradores(_x) {
        return _ref.apply(this, arguments);
    };
}();

function mostrarColaboradores(repo, token, user) {

    return new Promise(function (resolve, reject) {
        var aux = user.login + '/' + repo;
        var client = _octonode2.default.client(token);
        var ghrepo = client.repo(aux);
        console.log("Colaboradores del repo: ");
        console.log(" ");

        ghrepo.collaborators(function (err, contributors) {
            if (err) console.log(err);
            for (var i = 0; i < contributors.length; i++) {
                console.log(contributors[i].login);
            }
            console.log(" ");
            resolve(contributors);
        });
    });
}

exports.colaboradores = colaboradores;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.repo = undefined;

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

var repo = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(datos) {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (_fs2.default.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
                            _context.next = 4;
                            break;
                        }

                        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
                        _context.next = 7;
                        break;

                    case 4:
                        token = (0, _codigo.readToken)();
                        _context.next = 7;
                        return createRepo(datos, token);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function repo(_x) {
        return _ref.apply(this, arguments);
    };
}();

function createRepo(datos, token) {

    return new Promise(function (resolve, reject) {

        var descripcion = "Repo created by automatización para vagos" || datos._[0];

        var client = _octonode2.default.client(token);
        var ghme = client.me();

        ghme.repo({
            "name": datos.r,
            "description": datos._[0]
        }, function (err, status, body, headers) {
            if (err) {
                reject(err);
            } else {

                require('simple-git')().init().addRemote('origin', 'git@github.com:' + body.login + '/' + datos.r + '.git');

                console.log("Su repo se ha creado con éxito");
                resolve(body);
            }
        });
    });
}

exports.repo = repo;
'use strict';
require('babel-polyfill');

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = undefined;

var init = exports.init = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var datos, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return readCmdLine();

                    case 2:
                        datos = _context.sent;
                        _context.next = 5;
                        return createToken(datos);

                    case 5:
                        token = _context.sent;

                        _fs2.default.mkdirSync(process.env.HOME + '/.automatizacion-para-vagos');
                        _fs2.default.writeFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json', '{ "token": "' + token + '" }');

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

require('babel-polyfill');

var _octonode = require('octonode');

var _octonode2 = _interopRequireDefault(_octonode);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function createToken(data) {

    return new Promise(function (resolve, reject) {
        _octonode2.default.auth.config({
            username: data.usr,
            password: data.passwd
        }).login({
            scopes: ['user', 'repo'],
            note: 'automatizacion-para-vagos'
        }, function (err, id, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

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

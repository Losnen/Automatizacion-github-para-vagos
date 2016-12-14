'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = undefined;

require('babel-polyfill');

var _octonode = require('octonode');

var _octonode2 = _interopRequireDefault(_octonode);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _codigo = require('./codigo');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var init = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var datos, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!_fs2.default.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
                            _context.next = 4;
                            break;
                        }

                        console.log('Su token ya se ha generado y se encuentra en ' + process.env.HOME + '/.automatizacion-para-vagos/token.json');
                        _context.next = 13;
                        break;

                    case 4:
                        _context.next = 6;
                        return (0, _codigo.readCmdLine)();

                    case 6:
                        datos = _context.sent;
                        _context.next = 9;
                        return createToken(datos);

                    case 9:
                        token = _context.sent;

                        _fs2.default.mkdirSync(process.env.HOME + '/.automatizacion-para-vagos');
                        _fs2.default.writeFileSync(process.env.HOME + '/.automatizacion-para-vagos/token.json', '{ "token": "' + token + '" }');
                        console.log('Token guardado con éxito en' + process.env.HOME + '/.automatizacion-para-vagos/token.json');

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

function createToken(data) {

    return new Promise(function (resolve, reject) {
        _octonode2.default.auth.config({
            username: data.usr,
            password: data.passwd
        }).login({
            scopes: ['user', 'repo', 'admin:public_key', 'notifications', 'delete_repo', 'gist'],
            note: 'automatizacion-para-vagos'
        }, function (err, id, token) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

exports.init = init;
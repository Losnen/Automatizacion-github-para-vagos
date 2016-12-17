'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.user = undefined;

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

var user = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(datos) {
        var token;
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
                        _context.next = 11;
                        break;

                    case 8:
                        token = (0, _codigo.readToken)();
                        _context.next = 11;
                        return getUserInfo(datos, token);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function user(_x) {
        return _ref.apply(this, arguments);
    };
}();

function getUserInfo(datos, token) {

    return new Promise(function (resolve, reject) {

        var client = _octonode2.default.client(token);
        var ghuser = client.user(datos);
        ghuser.info(function (err, info) {
            if (err) console.log(err);
            console.log(" ");
            console.log("Usuario: " + info.login);
            console.log("Nombre: " + info.name);
            console.log("Compañia: " + info.company);
            console.log("Email: " + info.email);
            console.log("Blog: " + info.blog);
            console.log("Localización: " + info.location);
            console.log("bio: " + info.bio);
            console.log("Followers: " + info.followers);
            console.log("Following: " + info.following);
            console.log(" ");
        });
    });
}

exports.user = user;
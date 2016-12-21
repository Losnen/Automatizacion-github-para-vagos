'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deploy = undefined;

require('babel-polyfill');

var _octonode = require('octonode');

var _octonode2 = _interopRequireDefault(_octonode);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _dropbox = require('dropbox');

var _dropbox2 = _interopRequireDefault(_dropbox);

var _codigo = require('./codigo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var deploy = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(repo) {
        var token, _token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (_fs2.default.existsSync(process.env.HOME + '/.automatizacion-para-vagos/dropbox.json')) {
                            _context.next = 10;
                            break;
                        }

                        _context.next = 3;
                        return createToken();

                    case 3:
                        token = _context.sent;

                        _fs2.default.writeFileSync(process.env.HOME + '/.automatizacion-para-vagos/dropbox.json', '{ "token": "' + token + '" }');
                        console.log('Token guardado con éxito en' + process.env.HOME + '/.automatizacion-para-vagos/dropbox.json');
                        _context.next = 8;
                        return subirFicheros(token);

                    case 8:
                        _context.next = 13;
                        break;

                    case 10:
                        _token = (0, _codigo.readDropboxToken)();
                        _context.next = 13;
                        return subirFicheros(_token);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function deploy(_x) {
        return _ref.apply(this, arguments);
    };
}();

function subirFicheros(token) {

    return new Promise(function (resolve, reject) {

        if (!_fs2.default.existsSync('./README.pdf')) {
            console.log(" ");
            console.log("No existe el fichero README.pdf, generelo con el comando automatizacion-vagos -e");
            console.log(" ");
            process.exit(1);
        }

        var file = _fs2.default.readFileSync('./README.pdf');

        var dbx = new _dropbox2.default({
            accessToken: token
        });

        dbx.filesUpload({
            path: '/README.pdf',
            contents: file,
            mode: {
                ".tag": "overwrite"
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    });
}

function createToken() {

    return new Promise(function (resolve, reject) {
        var questions = [{
            type: 'input',
            name: 'token',
            message: 'Token de dropbox'
        }];

        _inquirer2.default.prompt(questions).then(function (answers) {
            resolve(answers.token);
        });
    });
}

exports.deploy = deploy;
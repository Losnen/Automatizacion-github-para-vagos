'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deploy = undefined;

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var deploy = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(repo) {
        var plugin, dirPlugin, req;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        plugin = "subir-nube-vagos";


                        try {
                            dirPlugin = _path2.default.resolve(process.cwd(), 'node_modules', plugin);
                            req = require(dirPlugin);

                            req.generar();
                        } catch (err) {
                            console.log("Error al cargar la dependencia: " + plugin + "Ejecute npm i -S subir-nube-vagos");
                        }

                    case 2:
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

exports.deploy = deploy;
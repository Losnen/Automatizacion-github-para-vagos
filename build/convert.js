'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convert = undefined;

require('babel-polyfill');

var _markdownPdf = require('markdown-pdf');

var _markdownPdf2 = _interopRequireDefault(_markdownPdf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
    remarkable: {
        html: true,
        breaks: true,
        plugins: [require('remarkable-classy')],
        syntax: ['footnote', 'sup', 'sub']
    }
};

function convert() {

    (0, _markdownPdf2.default)(options).from(process.cwd() + "/README.md").to(process.cwd() + "/README.pdf", function (err) {
        if (err) console.log(err);
        console.log("PDF creado correctamente");
    });
}
exports.convert = convert;
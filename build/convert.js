"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convert = undefined;

require("babel-polyfill");

var markdownpdf = require("markdown-pdf");
var path = require('path');
var fs = require("fs");
console.log(process.cwd());
var options = {
    remarkable: {
        html: true,
        breaks: true,
        plugins: [require('remarkable-classy')],
        syntax: ['footnote', 'sup', 'sub']
    }
};
function convert() {

    markdownpdf(options).from(process.cwd() + "/README.md").to(process.cwd() + "/README.pdf", function () {
        console.log("Done");
    });
}
exports.convert = convert;
"use strict";

require("babel-polyfill");

var markdownpdf = require("markdown-pdf");
var path = require('path');
var fs = require("fs");
var second_path = path.resolve(__dirname, "README.md");
console.log(second_path);
function convert_to_pdf() {

  fs.createReadStream("README.md").pipe(markdownpdf()).pipe(fs.createWriteStream("README.pdf"));
}
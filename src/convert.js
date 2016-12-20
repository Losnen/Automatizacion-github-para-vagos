import "babel-polyfill";
let markdownpdf = require("markdown-pdf");
let path = require('path');
let fs = require("fs");
console.log(process.cwd());
var options = {
    remarkable: {
        html: true,
        breaks: true,
        plugins: [ require('remarkable-classy') ],
        syntax: [ 'footnote', 'sup', 'sub' ]
    }
}
function convert() {
	
	markdownpdf(options).from(process.cwd()+"/README.md").to(process.cwd()+"/README.pdf", function () {
	  console.log("PDF creado correctamente")
	})
}
export {
    convert
};
import "babel-polyfill";
import markdownpdf from 'markdown-pdf';
import path from 'path';
import fs from 'fs';

let options = {
    remarkable: {
        html: true,
        breaks: true,
        plugins: [ require('remarkable-classy') ],
        syntax: [ 'footnote', 'sup', 'sub' ]
    }
}

function convert() {

	markdownpdf(options).from(process.cwd()+"/README.md").to(process.cwd()+"/README.pdf", (err) => {
    if (err) console.log(err);
	  console.log("PDF creado correctamente")
	});
}
export {
    convert
};

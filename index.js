#!/usr/bin/env node

import fs from "fs";
import inquirer from "inquirer";

import prettier from 'prettier';
import hljs from 'highlight.js';

import nodeHtmlToImage from 'node-html-to-image';


inquirer.prompt([
    {
        type: 'input',
        name: 'filePath',
        message: 'Enter file path:'
    }
]).then(({ filePath }) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const formattedCode = prettier.format(fileContent);
  
    const highlightedCode = hljs.highlightAuto(formattedCode).value;

    console.log(highlightedCode);

    nodeHtmlToImage({
        output: './image.png',
        html: `
        <html>
        <head>
            <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body{
                background-color: #282c34;
                width: 300px;
                height: 100vh;
                padding: 20px;
            }
                /*!
            Theme: Default
            Description: Original highlight.js style
            Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>
            Maintainer: @highlightjs/core-team
            Website: https://highlightjs.org/
            License: see project LICENSE
            Touched: 2021
            */.hljs{color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#e6c07b}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
            </style>
        </head>
        <body><pre><code class="hljs">${highlightedCode}</code></pre>
            <script src="https://unpkg.com/@highlightjs/cdn-assets@11.7.0/highlight.min.js"></script>
        </body>
        </html>
        `
    })
    .then(() => console.log('The image was created successfully!'))
  
    /*
    htmlToImage.toPng(highlightedCode)
    .then(dataUrl => {
      const img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    });
    */
});
/*
function getTxtFileNames(callback) {
    const directoryPath = "./";

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            console.error(err);
            return;
        }

        // Sadece .txt dosyalarını seçiyoruz
        const txtFiles = files.filter(function(file) {
            return file.endsWith(".txt");
        });

        callback(txtFiles);
    });
}

getTxtFileNames(function(txtFiles) {
    inquirer
        .prompt([
            {
                type: "list",
                name: "filename",
                message: "Hangi dosyayı okumak istersiniz?",
                choices: txtFiles,
            },
            {
                type: "list",
                name: "theme",
                message: "Hangi tema istersiniz?",
                choices: ["Light", "Dark"],
                filter: function(val) {
                    return val.toLowerCase();
                }
            }
        ])
        .then((answers) => {
            // Seçilen dosyayı okuma işlemi
            fs.readFile(answers.filename, "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);

                const formattedText = beautify.js_beautify(data); // Metnin biçimlendirilmesi
                console.log(formattedText);
                
                //const highlightedText = highlight("javascript", formattedText).value; // Metnin renklendirilmesi
                const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
                console.log(highlightedCode);
            });

        });
});
*/
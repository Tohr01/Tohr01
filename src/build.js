/*
Build script for cr.codes website. 3 different stages:
1. minify and purge css files using tailwind
2. copy static required files to dist directory (and html, js)
3. minify html and js

Exits with 0 if success 
Exits with 1 if error occured
*/

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { exit } = require('process');
const { globSync } = require('glob');
const { minify } = require('html-minifier-terser');
const jsObfuscator = require('javascript-obfuscator');
// Stage 1
const tailwindProfiles = [
    {
        'config': 'tailwind.config.js',
        'cssFiles': [['index-src.css', 'index-dist.css']]
    },
    {
        'config': 'backupschedule/tailwind.config.js',
        'cssFiles': [['backupschedule/index-src.css', 'backupschedule/index-dist.css']]
    },
    {
        'config': 'templates/tailwind.config.js',
        'cssFiles': [['templates/navigation-src.css', 'templates/navigation-dist.css']]
    }
]

// Create dist folder
const distFolder = path.join(__dirname, 'dist');
if (fs.existsSync(distFolder)) {
    fs.rmSync(distFolder, { recursive: true, force: true });
}
recursiveCreatePath(distFolder);

tailwindProfiles.forEach((tailwindProfile) => {
    tailwindProfile['cssFiles'].forEach((cssFile) => {
        const sourceFile = cssFile[0];
        const targetFile = path.join(distFolder, cssFile[1]);
        const targetDir = targetFile.substring(0, targetFile.lastIndexOf('/'));

        recursiveCreatePath(targetDir);

        try {
            execSync(`npx tailwindcss -c ${tailwindProfile['config']} -i ${sourceFile} -o ${targetFile} --minify 2>/dev/null`)
        } catch (error) {
            console.error(error.stderr);
            exit(1);
        }
    });
});

// Stage 2
const staticCopyFiles = ['assets',
    'fonts',
    ...globSync('**/*.html', { ignore: 'node_modules/**' }), // html files
    ...globSync('**/*.js', { ignore: ['node_modules/**', '**/tailwind.config.js', 'build.js']}) // js files
];

staticCopyFiles.forEach((filePath) => {
    fs.cpSync(filePath, path.join('dist', filePath), { recursive: true });
});

// Stage 3
const htmlFiles = globSync('dist/**/*.html', { ignore: 'node_modules/**' });
const jsFiles = globSync('dist/**/*.js', { ignore: ['node_modules/**', '**/tailwind.config.js', '*/scripts/external/*'] });

// "html-minify": "npx html-minifier --input-dir dist --output-dir dist --removeComments --collapse-whitespace --file-ext html",
htmlFiles.forEach((htmlFilePath) => {
    try {
        const html = fs.readFileSync(htmlFilePath, 'utf8');
        minify(html, {collapseWhitespace: true, removeComments: true}).then(minifiedHtml => {
            fs.writeFileSync(htmlFilePath, minifiedHtml);
        });
    } catch (error) {
        console.error(error);
        exit(1);
    }
});

jsFiles.forEach((jsPath) => {
    try {
        const js = fs.readFileSync(jsPath, 'utf8');
        const jsObfuscated = jsObfuscator.obfuscate(js).getObfuscatedCode();
        fs.writeFileSync(jsPath, jsObfuscated);
    } catch (error) {
        console.error(error);
        exit(1);
    }
});

function recursiveCreatePath(path) {
    fs.mkdirSync(path, { 'recursive': true }, (err) => {
        if (err) {
            console.error(err);
            exit(1);
        }
    });
}
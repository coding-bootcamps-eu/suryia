# Suriya-Api

## Requirements

Node.js v18.17.1.

'''
npm init

'''

Install TypeScript:

'''
npm install --save-dev typescript

'''

Let set up the TypeScript compiler. You have to create a configuration file as config.json:

'''

"compilerOptions": {
"module": "NodeNext",
"moduleResolution": "nodenext",
"baseUrl": "./src",
"esModuleInterop": true,
"outDir": "dist",
"sourceMap": true,
"noImplicitAny": true
},
"include": ["./src/**/*"],

'''
Add these couple of scripts to package.json:

'''
"scripts": {
"dev": "nodemon",
"start": "node ./dist/index.js",
"build": "tsc -w",
"test": "echo \"Error: no test specified\" && exit 1"
},
'''

Install Express as normal dependency :

'''
npm install --save express

'''

With this we have added express to the package.json file. Express by itself does not have any built in typescript support.
To use Express in the TypeScript program, install a development dependency of the following types:

'''
npm install --save-dev @types/express

Same procedure as before. Install body-parser, cors:

'''
npm install --save body-parser cors
npm install --save-dev @types/body-parser @types/cors

'''

Install .env:

'''
npm install --save dotenv

'''
